import { FC, memo } from "react";

const PenSvg: FC = memo(() => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L3 16.82V21h4.18L20.41 7.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path>
      <path fill="none" d="M0 0h24v24H0V0z"></path>
    </svg>
  );
});

PenSvg.displayName = "PenSvg";

export default PenSvg;
