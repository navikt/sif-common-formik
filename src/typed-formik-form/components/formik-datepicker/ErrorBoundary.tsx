import React from 'react';

class ErrorBoundary extends React.Component {
    componentDidCatch() {
        // Swallow errors
    }
    render() {
        return this.props.children;
    }
}

export default ErrorBoundary;
