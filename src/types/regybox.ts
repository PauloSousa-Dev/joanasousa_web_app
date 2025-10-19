/**
 * TypeScript types for RegyBox API integration
 * Based on the reverse-engineered RegyBox API
 */

/**
 * RegyBox class object returned from get_classes_for_the_day()
 */
export interface RegyBoxClass {
  time: string; // e.g., "07:00 - 08:00"
  students_in_class: string; // Current enrolled students as string
  total_students: string; // Max capacity as string
  can_join_class: boolean; // Whether user can join this class
  class_id: string; // Unique class identifier
  id_rato?: string; // Internal RegyBox parameter
  x?: string; // Internal RegyBox parameter
  sorrypartyisover?: string; // Internal RegyBox parameter
}

/**
 * Response from get_classes_for_the_day()
 */
export interface RegyBoxDayClasses {
  date: string; // Date in format returned by API
  classes: RegyBoxClass[];
}

/**
 * Enrolled person information from get_class_info()
 */
export interface RegyBoxEnrolledPerson {
  name: string;
  // Add other fields as discovered from actual API response
}

/**
 * Detailed class information from get_class_info()
 */
export interface RegyBoxClassInfo {
  total_enrolled: number;
  enrolled_people: RegyBoxEnrolledPerson[];
  class_date: string;
  class_hour: string;
}

/**
 * Login response with cookie
 */
export interface RegyBoxLoginResponse {
  success: boolean;
  cookie?: string;
  error?: string;
}

/**
 * API error response
 */
export interface RegyBoxError {
  error: string;
  details?: string;
}

/**
 * Parsed class data for frontend consumption
 */
export interface ParsedClass {
  time: string;
  program: string;
  studentsInClass: number;
  totalStudents: number;
  available: boolean;
  classId: string;
}

/**
 * Week schedule structure for frontend
 */
export interface WeekSchedule {
  day: string;
  classes: ParsedClass[];
}
