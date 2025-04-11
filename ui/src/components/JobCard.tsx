import React from 'react';
import './JobCard.css';

interface JobCardProps {
    info: {
        Name: string;
        Label: string;
        Grade: number;
        GradeName: string;
        Salary: number;
        PrimaryJob: boolean;
        OnDuty: boolean;
    };
}

const JobCard: React.FC<JobCardProps> = ({ info }) => {
    return (
        console.log(info),
        <div className={`job-card ${info.PrimaryJob ? 'selected' : ''}`}>
            <div className="job-name">{info.Label}</div>
            <div className="job-details">
                <span>Grade:</span> {info.GradeName} [{info.Grade}]<br />
                <span>Salary:</span> ${info.Salary}
            </div>
            <div className="job-actions">
                {info.PrimaryJob ? (
                    // Render this button if PrimaryJob is true
                    <button className="job-status-duty"
                            data-job={info.Name}
                            onClick={() => {
                                fetchNui('toggleDuty', info.Name);
                                if(document.querySelector('.job-status-duty').textContent === 'Clock-In') {
                                    document.querySelector('.job-status-duty').textContent = 'Clock-Out';
                                }
                                else {
                                    document.querySelector('.job-status-duty').textContent = 'Clock-In';
                                }
                            }}
                    >
                        {info.OnDuty ? 'Clock-Out' : 'Clock-In'}
                    </button>
                ) : (
                    // Render this button if PrimaryJob is false
                    <button
                        className="job-status"
                        data-job={info.Name}
                        onClick={() => {
                            fetchNui('changeJob', info.Name);
                        }}
                    >
                        Select
                    </button>
                )}
                <button className="job-status"
                        onClick={() => {
                            if (info.Name === "unemployed") {
                                // Display a different popup if the user tries to quit the "unemployed" job
                                components.setPopUp({
                                    title: 'Action Denied',
                                    description: 'You cannot quit this job',
                                    buttons: [
                                        {
                                            title: 'Okay',
                                            color: 'red',
                                        }
                                    ]
                                });
                                return; // Exit early, no further action needed
                            }

                            // Normal logic for other jobs
                            components.setPopUp({
                                title: 'Quitting ' + info.Label,
                                description: 'Are you sure you want to quit?',
                                buttons: [
                                    {
                                        title: 'Cancel',
                                        color: 'red',
                                    },
                                    {
                                        title: 'Quit',
                                        color: 'blue',
                                        cb: () => {
                                            fetchNui('removeJob', info.Name);
                                        }
                                    }
                                ]
                            });
                        }}
                >
                    Quit Job
                </button>
            </div>
        </div>
    );
};

export default JobCard;