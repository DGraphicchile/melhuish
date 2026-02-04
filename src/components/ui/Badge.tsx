interface BadgeProps {
  children: React.ReactNode;
  variant?: 'accent' | 'success';
  className?: string;
}

export function Badge({ children, variant = 'accent', className = '' }: BadgeProps) {
  const variants = {
    accent: 'badge-accent',
    success: 'badge-success',
  };

  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
