import { fetchInstructors } from "../lib/data";

export default async function InstructorsTable() {
    const instructors = await fetchInstructors();

    return (
        <div>instructor table</div>
    );
}