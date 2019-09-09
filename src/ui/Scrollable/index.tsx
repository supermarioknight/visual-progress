import React, { useState, useRef, useEffect } from 'react';
import { useElementVisibility } from '../useElementVisibility';
import { ScrollableContainer, ScrollableContent } from './styled';

interface ScrollableProps {
  render: (opts: { active: boolean; visibility: number }) => React.ReactNode;
}

const useScrollable = () => {
  const previousRef = useRef();
  const previousVisibility = useElementVisibility(previousRef);
  const currentRef = useRef();
  const currentVisibility = useElementVisibility(currentRef);
  const nextRef = useRef();
  const nextVisibility = useElementVisibility(nextRef);

  return {
    previous: {
      ref: previousRef,
      visibility: previousVisibility
    },
    current: {
      ref: currentRef,
      visibility: currentVisibility
    },
    next: {
      ref: nextRef,
      visibility: nextVisibility
    }
  };
};

export const Scrollable: React.FC<ScrollableProps> = ({ render }) => {
  const scrollable = useScrollable();
  const [active, setActive] = useState(0);
  const totalChildren = 3;

  const getRef = (index: number): any => {
    switch (index) {
      case active - 1:
        return scrollable.previous.ref;

      case active:
        return scrollable.current.ref;

      case active + 1:
        return scrollable.next.ref;

      default:
        return undefined;
    }
  };

  const getVisibility = (index: number) => {
    switch (index) {
      case active - 1:
        return scrollable.previous.visibility;

      case active:
        return scrollable.current.visibility;

      case active + 1:
        return scrollable.next.visibility;

      default:
        return 0;
    }
  };

  useEffect(() => {
    console.log('active', active);
    // console.log('previous', scrollable.previous.visibility);
    // console.log('current', scrollable.current.visibility);
    // console.log('next', scrollable.next.visibility);

    if (scrollable.next.visibility >= 0.5) {
      console.log('go next');
      // setActive(active + 1);
      // move active + 1
      // move next to current
      // move current to previous
      // reset next
    } else if (scrollable.previous.visibility >= 0.5) {
      console.log('go previous');
      // setActive(active - 1);
      // move active - 1
      // move previous to current
      // move current to next
      // reset previous
    }
  });

  return (
    <ScrollableContainer count={totalChildren}>
      {[0, 0, 0].map((_, index) => (
        <ScrollableContent ref={getRef(index)}>
          {render({
            active: active === index,
            visibility: getVisibility(index)
          })}
        </ScrollableContent>
      ))}
    </ScrollableContainer>
  );
};

export { ScrollableContent } from './styled';
