export type TraineeStatus = 'active' | 'completed' | 'dropped';
export type AttendanceStatus = 'present' | 'absent' | 'late';
export type TrainingPhase = 'Orientation' | 'Phase 1' | 'Phase 2' | 'Full-stack' | 'Graduated';

export interface Trainee {
  id: string;
  name: string;
  department: string;
  cohort: string;
  enrollDate: string;
  status: TraineeStatus;
  phase?: TrainingPhase;
  cohortScore?: number;
  cohortNotes?: string;
}

export interface AttendanceRecord {
  traineeId: string;
  date: string;
  status: AttendanceStatus;
}

export interface Assessment {
  id: string;
  name: string;
  date: string;
  maxScore: number;
  passingScore: number;
}

export interface AssessmentScore {
  assessmentId: string;
  traineeId: string;
  score: number | null;
}

export interface KPI {
  id: string;
  name: string;
  target: number;
  actual: number | null;
  unit: string;
}

export interface TrainingDoc {
  id: string;
  title: string;
  date: string;
  trainer: string;
  program: string;
  summary: string;
  highlights: string;
  actionPlan: string;
  notes: string;
  createdAt: string;
}

export interface DocFile {
  id: string;
  name: string;
  type: string;
  size: number;
  data: string;
  uploadedAt: string;
}

export type View =
  | 'dashboard'
  | 'trainees'
  | 'attendance'
  | 'assessments'
  | 'reports'
  | 'kpi'
  | 'email'
  | 'cohort'
  | 'printreport'
  | 'document'
  | 'datamanager';
