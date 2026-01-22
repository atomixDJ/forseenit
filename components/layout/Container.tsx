import React from 'react';

export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="container-custom flex flex-col min-h-[calc(100vh-64px)]">
            {children}
        </div>
    );
}
