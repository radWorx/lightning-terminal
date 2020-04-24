import React from 'react';

/**
 * This component represents a Row in the bootstrap Grid layout
 */
export const Row: React.FC = ({ children }) => <div className="row">{children}</div>;

/**
 * A column in the bootstrap Grid layout
 * @param cols the number of columns wide (optional)
 */
export const Column: React.FC<{
  cols?: number;
  className?: string;
}> = ({ cols, children, className }) => {
  const cls = (className || '') + (cols ? ` col-${cols}` : ' col');
  return <div className={cls.trim()}>{children}</div>;
};