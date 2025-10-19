import { useQuery, useQueries } from "@tanstack/react-query";
import type { RegyBoxDayClasses } from "@/types/regybox";

/**
 * Class data formatted for the frontend
 */
interface ClassData {
  time: string;
  program: string;
  available: boolean;
  studentsInClass: number;
  totalStudents: number;
}

/**
 * Day schedule with classes
 */
interface DaySchedule {
  day: string;
  date: string;
  classes: ClassData[];
}

/**
 * Helper function to get dates for current week (Monday-Friday)
 */
function getWeekDates() {
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Calculate Monday of current week
  const monday = new Date(today);
  const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay;
  monday.setDate(today.getDate() + daysToMonday);

  const weekDays = [
    { day: "Segunda", offset: 0 },
    { day: "Terça", offset: 1 },
    { day: "Quarta", offset: 2 },
    { day: "Quinta", offset: 3 },
    { day: "Sexta", offset: 4 },
  ];

  return weekDays.map(({ day, offset }) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + offset);
    return {
      day,
      date: date.toISOString().split("T")[0], // YYYY-MM-DD format
    };
  });
}

/**
 * Fetch classes for a specific date from RegyBox API
 */
async function fetchClassesForDate(date: string): Promise<DaySchedule> {
  const response = await fetch(`/api/regybox/classes?date=${date}`);

  if (!response.ok) {
    throw new Error(
      `Erro ao carregar aulas para ${date}: ${response.status} ${response.statusText}`
    );
  }

  const data: RegyBoxDayClasses = await response.json();

  // Transform RegyBox data to our format
  const classes: ClassData[] = data.classes.map((cls) => ({
    time: cls.time,
    program: "Treino", // Default program name
    available: cls.can_join_class,
    studentsInClass: parseInt(cls.students_in_class, 10),
    totalStudents: parseInt(cls.total_students, 10),
  }));

  return {
    day: "", // Will be set by useQueries
    date: data.date,
    classes,
  };
}

/**
 * Custom hook to fetch week schedule using React Query
 * Uses parallel queries for optimal performance
 *
 * @returns {object} Query result with data, loading, and error states
 */
export function useWeekSchedule() {
  const weekDates = getWeekDates();

  // Use useQueries to fetch all days in parallel
  const queries = useQueries({
    queries: weekDates.map(({ day, date }) => ({
      queryKey: ["schedule", date],
      queryFn: async () => {
        const result = await fetchClassesForDate(date);
        return { ...result, day }; // Add day name to result
      },
      // Override default stale time for schedule data (fresher data)
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 10000),
    })),
  });

  // Combine results from all queries
  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  const errors = queries
    .filter((query) => query.error)
    .map((query) => query.error);

  // Get successful data
  const data: DaySchedule[] = queries
    .map((query) => query.data)
    .filter((data): data is DaySchedule => data !== undefined);

  // Check if any queries are still fetching (for refetch scenarios)
  const isFetching = queries.some((query) => query.isFetching);

  // Refetch function to manually trigger a refresh
  const refetch = () => {
    queries.forEach((query) => query.refetch());
  };

  return {
    data,
    isLoading,
    isError,
    isFetching,
    error: errors.length > 0 ? errors[0] : null,
    refetch,
    // Individual query states for debugging
    queries,
  };
}

/**
 * Hook to fetch classes for a single day
 * Useful for detail views or individual day components
 *
 * @param date - Date string in YYYY-MM-DD format
 * @returns Query result for single day
 */
export function useDaySchedule(date: string) {
  return useQuery({
    queryKey: ["schedule", date],
    queryFn: () => fetchClassesForDate(date),
    enabled: !!date, // Only fetch if date is provided
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}
