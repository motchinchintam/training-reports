import type { Trainee, Assessment, AttendanceRecord, AssessmentScore, KPI } from "./types";

export const sampleTrainees: Trainee[] = [
  { id: 't1', name: 'Alice Reyes', department: 'Operations', cohort: 'Batch 2024-A', enrollDate: '2024-01-08', status: 'active', phase: 'Phase 2', cohortScore: 88 },
  { id: 't2', name: 'Ben Santos', department: 'Sales', cohort: 'Batch 2024-A', enrollDate: '2024-01-08', status: 'active', phase: 'Phase 1', cohortScore: 74 },
  { id: 't3', name: 'Cara Mendoza', department: 'HR', cohort: 'Batch 2024-A', enrollDate: '2024-01-08', status: 'active', phase: 'Phase 2', cohortScore: 79 },
  { id: 't4', name: 'Dan Lim', department: 'Operations', cohort: 'Batch 2024-A', enrollDate: '2024-01-08', status: 'completed', phase: 'Graduated', cohortScore: 92 },
  { id: 't5', name: 'Eva Cruz', department: 'Sales', cohort: 'Batch 2024-A', enrollDate: '2024-01-08', status: 'active', phase: 'Full-stack', cohortScore: 82 },
  { id: 't6', name: 'Frank Torres', department: 'IT', cohort: 'Batch 2024-B', enrollDate: '2024-04-01', status: 'active', phase: 'Orientation', cohortScore: 65 },
  { id: 't7', name: 'Grace Tan', department: 'Finance', cohort: 'Batch 2024-B', enrollDate: '2024-04-01', status: 'dropped', phase: 'Phase 1', cohortScore: 45 },
  { id: 't8', name: 'Hiro Yamada', department: 'IT', cohort: 'Batch 2024-B', enrollDate: '2024-04-01', status: 'active', phase: 'Phase 1', cohortScore: 70 },
];

export const sampleAssessments: Assessment[] = [
  { id: 'a1', name: 'Orientation Quiz', date: '2024-01-12', maxScore: 50, passingScore: 35 },
  { id: 'a2', name: 'Module 1 Exam', date: '2024-02-05', maxScore: 100, passingScore: 75 },
  { id: 'a3', name: 'Module 2 Exam', date: '2024-03-01', maxScore: 100, passingScore: 75 },
  { id: 'a4', name: 'Final Assessment', date: '2024-03-28', maxScore: 150, passingScore: 112 },
];

export const sampleAttendance: AttendanceRecord[] = [
  { traineeId: 't1', date: '2024-01-08', status: 'present' },
  { traineeId: 't2', date: '2024-01-08', status: 'present' },
  { traineeId: 't3', date: '2024-01-08', status: 'late' },
  { traineeId: 't4', date: '2024-01-08', status: 'present' },
  { traineeId: 't5', date: '2024-01-08', status: 'absent' },
  { traineeId: 't1', date: '2024-01-09', status: 'present' },
  { traineeId: 't2', date: '2024-01-09', status: 'absent' },
  { traineeId: 't3', date: '2024-01-09', status: 'present' },
  { traineeId: 't4', date: '2024-01-09', status: 'present' },
  { traineeId: 't5', date: '2024-01-09', status: 'present' },
  { traineeId: 't1', date: '2024-01-10', status: 'present' },
  { traineeId: 't2', date: '2024-01-10', status: 'present' },
  { traineeId: 't3', date: '2024-01-10', status: 'present' },
  { traineeId: 't4', date: '2024-01-10', status: 'late' },
  { traineeId: 't5', date: '2024-01-10', status: 'present' },
];

export const sampleScores: AssessmentScore[] = [
  { assessmentId: 'a1', traineeId: 't1', score: 46 },
  { assessmentId: 'a1', traineeId: 't2', score: 38 },
  { assessmentId: 'a1', traineeId: 't3', score: 30 },
  { assessmentId: 'a1', traineeId: 't4', score: 44 },
  { assessmentId: 'a1', traineeId: 't5', score: 40 },
  { assessmentId: 'a2', traineeId: 't1', score: 88 },
  { assessmentId: 'a2', traineeId: 't2', score: 74 },
  { assessmentId: 'a2', traineeId: 't3', score: 81 },
  { assessmentId: 'a2', traineeId: 't4', score: 92 },
  { assessmentId: 'a2', traineeId: 't5', score: 76 },
  { assessmentId: 'a3', traineeId: 't1', score: 91 },
  { assessmentId: 'a3', traineeId: 't2', score: 67 },
  { assessmentId: 'a3', traineeId: 't3', score: 79 },
  { assessmentId: 'a3', traineeId: 't4', score: 88 },
  { assessmentId: 'a3', traineeId: 't5', score: 82 },
  { assessmentId: 'a4', traineeId: 't1', score: 135 },
  { assessmentId: 'a4', traineeId: 't2', score: 98 },
  { assessmentId: 'a4', traineeId: 't3', score: 118 },
  { assessmentId: 'a4', traineeId: 't4', score: 140 },
  { assessmentId: 'a4', traineeId: 't5', score: 122 },
];

export const sampleKPIs: KPI[] = [
  { id: 'k1', name: 'Training Days Completed', target: 20, actual: 14, unit: 'days' },
  { id: 'k2', name: 'Trainees Passing Mid-Test', target: 100, actual: 80, unit: '%' },
  { id: 'k3', name: 'Attendance Rate', target: 95, actual: 88, unit: '%' },
  { id: 'k4', name: 'Final Assessment Pass Rate', target: 90, actual: null, unit: '%' },
];
