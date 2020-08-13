import React from 'react';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
    componentDidCatch() {
        // Swallow errors
    }
    render() {
        return this.props.children;
    }
}

export default ErrorBoundary;
