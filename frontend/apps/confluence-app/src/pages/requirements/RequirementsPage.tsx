import styles from "./RequirementsPage.module.scss";

/**
 * Probably the cause of the bug.
 */
AP.resize();

const RequirementsPage = () => {
    return (
        <div className={styles.container}>
            <h1>Requirements</h1>
            <ul>
                {Array.from({length: 300}).map((requirement, index) => (
                    <li key={index}>{"Requirement: REQ-" + index}</li>
                ))}
            </ul>
        </div>
    );
};

export default RequirementsPage;
