export type Role = 'admin' | 'dad' | 'mom' | 'me';
export type Category = 'dad' | 'mom' | 'me' | 'unknown';
export type Relation = '친척' | '직장' | '친구' | '교회' | '기타';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  approved: boolean;
  created_at: string;
}

export interface Guest {
  id: string;
  name: string;
  amount: number;
  category: Category;
  relation: Relation;
  thanked: boolean;
  memo: string | null;
  created_by: string;
  created_at: string;
}

export interface GuestFilter {
  search: string;
  category: Category | 'all';
  relation: Relation | 'all';
  amountRange: 'all' | 'under5' | '5to10' | 'over10';
}

export interface CategoryStats {
  category: Category;
  totalAmount: number;
  count: number;
  average: number;
}
