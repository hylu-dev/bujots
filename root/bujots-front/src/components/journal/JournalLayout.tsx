import { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode | ReactElement;
};

export default function JournalLayout({ children }: Props) {
  return (
    <div className='h-screen w-screen grid place-content-center'>
      <div className="grid grid-cols-journal grid-rows-journal">
        {children}
      </div>
    </div>
  )
}
