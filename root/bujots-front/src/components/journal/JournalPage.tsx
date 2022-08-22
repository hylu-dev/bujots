import { useContext } from "react";
import PageContext from '../../contexts/PageContext';

export default function JournalPage() {
    const { page, setPage } = useContext(PageContext);
    const date = new Date(page.date);

    return <>
        {/* A4 Aspect Ratio 1:1.4142 */}
        <div className='flex h-full w-full flex-col bg-paper-light rounded shadow-md p-5'>
            <div className="flex justify-between basis-0 grow-[1] border-b-2 border-paper-dark px-1">
                <h1>{page.title}</h1>
                <small>{date.toDateString()}</small>
            </div>
            <div className="basis-0 grow-[20]">
                <span> </span>
                {page.body}
            </div>
        </div>
    </>
}
