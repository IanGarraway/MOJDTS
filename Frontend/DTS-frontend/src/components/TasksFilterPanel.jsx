import { Form } from "react-bootstrap";

/**
 * TasksFilterPanel
 * Renders checkboxes for filtering tasks by their status.
 * Updates the parent component's activeStatuses state via setActiveStatuses.
 * 
 * Props:
 * - activeStatuses: Set<number>  // currently active status filters
 * - setActiveStatuses: function  // updates activeStatuses in parent
 */
function TasksFilterPanel({ activeStatuses, setActiveStatuses }) {
    
    const toggleStatus = (status) => {
        setActiveStatuses(prev => {
            const updated = new Set(prev);
            if (updated.has(status)) {
                updated.delete(status);
            } else {
                updated.add(status);
            }
            return updated;
        });
    };

    const statusOptions = [
        { label: "Pending", value: 1 },
        { label: "In Progress", value: 2 },
        { label: "Completed", value: 3 },
    ];

    
    return (
        <div>
            <h2>Filters</h2>
            {statusOptions.map(({ label, value }) => (
                <Form.Check
                    key={value}
                    type="checkbox"
                    id={`status-${value}`}
                    label={label}
                    checked={activeStatuses.has(value)}
                    onChange={() => toggleStatus(value)}
                />
            ))}
        </div>
    );
}

export default TasksFilterPanel