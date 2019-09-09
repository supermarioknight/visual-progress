import React from 'react';
import { Scrollable } from '../Scrollable';

interface TeamProps {
  name: string;
  totalMatches: number;
}

export const Team: React.FC<TeamProps> = () => {
  return <Scrollable render={props => <div>{JSON.stringify(props)}</div>} />;
};
