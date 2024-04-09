'use client';
import { useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from './Button';

export const SubmitButton = ({ children, onSubmitted, ...props }) => {
    const { pending } = useFormStatus();

    useEffect(() => {
        if (pending) {
            return () => {
                if (onSubmitted) {
                    onSubmitted();
                }
            };
        }
    }, [pending]);

    return (
        <Button {...props} disabled={pending}>
            {children}
        </Button>
    );
};
