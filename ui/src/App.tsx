import { ReactNode, useEffect, useRef, useState } from 'react'
import './App.css'
import Frame from './components/Frame'
import JobCard from './components/JobCard'
import axios from 'axios';


const devMode = !window?.['invokeNative']

const App = () => {
    const appDiv = useRef(null)
    const [jobs, setJobs] = useState([]); // State to store jobs fetched from Lua

    function fetchJobData() {
        return axios
            .post('https://sz_multijob/getJobs', {}) // Ensure the endpoint is correct
            .then((response) => {
                const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                console.log(data);

                // Always return the data, fallback to an empty array if needed
                if (Array.isArray(data)) {
                    return data;
                } else {
                    console.warn('Jobs data is not an array:', response.data);
                    return [];
                }
            })
            .catch((error) => {
                console.error('Error fetching jobs:', error);

                // Return an empty array in case of error
                return [];
            });
    }

    useEffect(() => {
        if (devMode) {
            document.body.style.visibility = 'visible'
            return
        }

        window.addEventListener('message', (event) => {
            if (event.data.data === 'open') {
                fetchJobData().then((data) => {
                    setJobs(data || []); // Ensure that an empty array is set if data is invalid
                });
            }
        })

        // Fetch job information when the app initializes
        fetchJobData().then((data) => {
            setJobs(data || []); // Ensure that an empty array is set if data is invalid
        });

    }, [])

    return (
        <AppProvider>
            <div className="app" ref={appDiv}>
                <div className="app-wrapper">
                    <Header />
                    <div className="button-wrapper">
                        {jobs.map((job) => (
                            <JobCard
                                key={job.Name}
                                info={{
                                    Name: job.Name,
                                    Label: job.Label,
                                    Grade: job.Grade,
                                    GradeName: job.GradeData.name,
                                    Salary: job.GradeData.payment,
                                    PrimaryJob: job.PrimaryJob,
                                    OnDuty: job.OnDuty,
                                }}
                            />))}
                    </div>
                </div>
            </div>
        </AppProvider>
    )
}

const Header = () => {
    useEffect(() => {
        if (devMode) return
    }, [])

    return (
        <div className="header">
            <div className="title">Employment</div>
        </div>
    )
}

const AppProvider = ({ children }: { children: ReactNode }) => {
    if (devMode) {
        const handleResize = () => {
            const { innerWidth, innerHeight } = window

            const aspectRatio = innerWidth / innerHeight
            const phoneAspectRatio = 27.6 / 59

            if (phoneAspectRatio < aspectRatio) {
                document.documentElement.style.fontSize = '1.66vh'
            } else {
                document.documentElement.style.fontSize = '3.4vw'
            }
        }

        useEffect(() => {
            window.addEventListener('resize', handleResize)

            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }, [])

        handleResize()

        return (
            <div className="dev-wrapper">
                <Frame>{children}</Frame>
            </div>
        )
    } else return children
}

export default App
