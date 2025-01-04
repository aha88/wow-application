import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CCardTitle, CCol, CContainer, CFormLabel, CRow } from '@coreui/react';
import companiesService from '../../services/companiesService'; 
import dashboardsService from '../../services/dashboardsService'; 
import MyDataTable from '@/component/MyDataTable';
import MyCounter from '@/component/MyCounter';
import { tokenV, sessionV, employeeV, dashboardCountV } from "../../store/authuser";
import { useAtom } from 'jotai';

const Dashboard = () => {
    const [tokenValue] = useAtom(tokenV);
    const [sessionValue] = useAtom(sessionV);
    const [employeesValue, setEmployeeV] = useAtom(employeeV);
    const [dashboardCountValue, setDashboardCountV] = useAtom(dashboardCountV);
    const [dashboardConditionValue, setDashboardConditionV] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchCompanyData = async () => {
            if (employeesValue?.length === 0) {
                setLoading(true);
                try {
                    const companiesData = await companiesService.fetchCompaniesData(tokenValue);
                    setEmployeeV(companiesData.data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, [employeesValue]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (dashboardCountValue?.length === 0 || dashboardCountValue == null) {
                setLoading(true);
                try {
                    const dashboardData = await dashboardsService.fetchDashboardData(tokenValue);
                    setDashboardCountV(dashboardData.data);

                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [dashboardCountValue]);
   
    useEffect(() => {
        const fetchDashboardData = async () => {
            if (dashboardConditionValue?.length === 0 || dashboardConditionValue == null) {
                setLoading(true);
                try {

                    const dashboarConditions = await dashboardsService.fetchDashboardCountCondition(tokenValue);
                    setDashboardConditionV(dashboarConditions.data);

                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [dashboardConditionValue]);

    const handleDelete = () => {
        // Implement delete functionality
    };

    const handleView = (e) => {
        router.push(`../companies/${e.id}`);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (<>
            <CContainer className='mt-3'>
                <CRow className='mt-3'>
                    <CCol md={12}>
                        <CCardTitle>Dashboard</CCardTitle>
                    </CCol>
                </CRow>

                <CRow className='mt-3'>
                {dashboardConditionValue.map((dt,i) => {
                    return <React.Fragment key={i}>
                        <MyCounter number={dt.count} btn={false} title={dt.conditionName} />
                    </React.Fragment>
                    })}
                </CRow>

                <hr className='border'/>
                
                <CRow className='mt-4'>
                    {employeesValue || dashboardCountValue ?
                        <CCol md={3}>
                            <MyCounter
                                title="TOTAL OF COMPANY"
                                number={employeesValue?.length || 0}
                                btn={false}
                                mdSize={12}
                                classColorName="bg-light text-dark text-center "
                            />
                            <MyCounter
                                title="TOTAL OF EMPLOYEE SIGNUP"
                                number={dashboardCountValue[1]?.all_employee_count || 0}
                                btn={false}
                                mdSize={12}
                                classColorName="bg-dark text-light text-center"
                            />
                        </CCol>
                        :
                    ''
                    }
                    
                    <CCol md={9} className='mb-4'>
                    <div className='boxcontainer p-3 text-black'>
                        <CCardTitle>Company Latest</CCardTitle>

                        {employeesValue && (
                            <>
                            <div className='table-responsive mt-3'>
                                <MyDataTable
                                    data={employeesValue.length > 0 ? employeesValue : []}
                                    onDelete={handleDelete}
                                    onView={handleView}
                                    />
                            </div>
                            </>
                        )}
                    </div>
                    </CCol>

                </CRow>
            </CContainer>
        </>);
};

export default Dashboard;
