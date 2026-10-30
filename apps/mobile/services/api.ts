const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

// Pre-signed 30-day dev token for parent.demo@downplus.health for seamless mobile testing
const DEFAULT_DEV_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDBmNDcwNS1iMjMxLTQxZDAtODQyYy1hM2E4NmUwY2Y0MzMiLCJlbWFpbCI6InBhcmVudC5kZW1vQGRvd25wbHVzLmhlYWx0aCIsInJvbGUiOiJwYXJlbnQiLCJpYXQiOjE3OTMzOTcwOTcsImV4cCI6MTc5NTk4OTA5N30.SsCSLQjHzM1gvpiDe44o-ThUnBcxMCuNw9YdylSjfI4';

class ApiService {
  private token: string | null = DEFAULT_DEV_TOKEN;
  private activeChildId: string = '61871691-0784-4f0f-87de-f407f323a44d';

  setToken(token: string | null) {
    this.token = token;
  }

  getActiveChildId(): string {
    return this.activeChildId;
  }

  setActiveChildId(id: string) {
    this.activeChildId = id;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok || data.success === false) {
      const errorMsg = data?.error?.message || `Request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    return (data.data !== undefined ? data.data : data) as T;
  }

  // ── Auth ──
  async login(email: string, password: string) {
    const res = await this.request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    if (res.accessToken) {
      this.setToken(res.accessToken);
    }
    return res;
  }

  async register(email: string, phoneNumber: string, password: string) {
    const res = await this.request<any>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, phoneNumber, password }),
    });
    if (res.accessToken) {
      this.setToken(res.accessToken);
    }
    return res;
  }

  async verifyOtp(phoneNumber: string, code: string) {
    return this.request<any>('/auth/otp/verify', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber, code }),
    });
  }

  // ── Children ──
  async getChildren() {
    return this.request<any[]>('/children');
  }

  async getChild(childId: string) {
    return this.request<any>(`/children/${childId}`);
  }

  async createChild(payload: any) {
    return this.request<any>('/children', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  // ── Milestones ──
  async getMilestones(childId: string) {
    return this.request<any[]>(`/children/${childId}/milestones`);
  }

  async getMilestoneCatalog(domain?: string, ageMonths?: number) {
    const params = new URLSearchParams();
    if (domain) params.append('domain', domain);
    if (ageMonths) params.append('age_months', String(ageMonths));
    return this.request<any[]>(`/milestones/catalog?${params.toString()}`);
  }

  async updateMilestone(childId: string, milestoneId: string, status: string, notes?: string) {
    return this.request<any>(`/children/${childId}/milestones/${milestoneId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
  }

  // ── Documents ──
  async getPresignedUploadUrl(childId: string, fileName: string, fileType: string, category: string) {
    return this.request<any>(`/children/${childId}/documents/presigned-url`, {
      method: 'POST',
      body: JSON.stringify({
        file_name: fileName,
        file_type: fileType,
        document_category: category,
      }),
    });
  }

  async getDocuments(childId: string) {
    return this.request<any[]>(`/children/${childId}/documents`);
  }

  // ── Case Baseline ──
  async getCaseBaseline(childId: string) {
    return this.request<any>(`/children/${childId}/case-baseline`);
  }

  // ── AI Chat ──
  async sendChatMessage(childId: string, message: string, sessionId?: string) {
    return this.request<any>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({
        child_id: childId,
        message,
        session_id: sessionId,
      }),
    });
  }

  // ── Sharing ──
  async generateShareToken(childId: string, validityHours = 48) {
    return this.request<any>('/sharing/generate-token', {
      method: 'POST',
      body: JSON.stringify({
        child_id: childId,
        validity_hours: validityHours,
      }),
    });
  }

  // ── Case Updates ──
  async logCaseUpdate(childId: string, updateType: string, content: string) {
    return this.request<any>('/case-updates', {
      method: 'POST',
      body: JSON.stringify({
        child_id: childId,
        update_type: updateType,
        content,
      }),
    });
  }

  async getTimeline(childId: string) {
    return this.request<any[]>(`/case-updates/timeline/${childId}`);
  }
}

export const api = new ApiService();
