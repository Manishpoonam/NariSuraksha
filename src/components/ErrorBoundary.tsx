import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('NariSuraksha caught runtime error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      // Clear potentially corrupted navigation/filter state from localStorage
      sessionStorage.clear();
      // Keep user confidential offline drafts safe, only reset ephemeral navigation keys
      localStorage.removeItem('suraksha_active_tab_v1');
      localStorage.removeItem('suraksha_takedown_subtab_v1');
      localStorage.removeItem('suraksha_report_subtab_v1');
      localStorage.removeItem('suraksha_support_subtab_v1');
    } catch {}
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF8F3] text-[#26215C] flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-[#26215C]/10 space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-[#E1F5EE] text-[#0F6E56] mx-auto flex items-center justify-center font-bold text-xl">
              🛡️
            </div>
            <div className="space-y-2">
              <h1 className="text-xl font-bold tracking-tight text-[#26215C]">
                NariSuraksha
              </h1>
              <p className="text-sm text-[#5A5672]">
                A minor browser rendering hiccup occurred. Your emergency guides, offline evidence, and contacts remain safe.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={this.handleReset}
                className="w-full py-3 px-6 rounded-full bg-[#26215C] hover:bg-[#1E1949] text-white font-medium text-sm transition-all cursor-pointer shadow-xs active:scale-98"
              >
                Reload Emergency Portal
              </button>
            </div>
            <div className="text-xs text-[#85819C] pt-2 border-t border-[#26215C]/5">
              Immediate Helplines: <strong>1930</strong> (Cyber Crime) • <strong>112</strong> (Police)
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
