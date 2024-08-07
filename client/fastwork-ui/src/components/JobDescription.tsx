'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import httpClient from '@/client/httpClient';
import { baseURL } from '@/baseURL';

const JobDescription = (): React.ReactElement => {
  const [serviceData, setServiceData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('id');

  useEffect(() => {
    if (serviceId) {
      const fetchServiceData = async () => {
        try {
          const response = await httpClient.get(`http://localhost:8081/api/v1/service/get?serviceId=${serviceId}`);
          setServiceData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching service data:', error);
          setLoading(false);
        }
      };
      fetchServiceData();
    }
  }, [serviceId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!serviceData) {
    return <div>No service data found.</div>;
  }

  return (
      <div>
        <header className="py-8 px-4 md:px-6 lg:px-8" style={{ background: '#0B2147' }}>
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-white">{serviceData.title}</h1>
            <p className="text-white">{serviceData.profileDTO?.companyName || "Acme Inc."}</p>
          </div>
        </header>
        <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-100">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Job Description</h2>
            <p className="mb-8">{serviceData.description || "We are seeking an experienced Frontend Developer to join our growing team. In this role, you will be responsible for building and maintaining high-performance, scalable web applications using modern JavaScript frameworks and libraries."}</p>

            <h3 className="text-xl font-bold mb-4">Category</h3>
            <p className="mb-4">{serviceData.categoryDTO?.name || "Programming and Tech"}</p>

            <h3 className="text-xl font-bold mb-4">Employment Type</h3>
            <p className="mb-4">{serviceData.employmentType || "Full-time"}</p>

            <h3 className="text-xl font-bold mb-4">Salary</h3>
            <p className="mb-4">{serviceData.price ? `${serviceData.price} ${serviceData.priceUnit}` : "20000 baht per month"}</p>

            <h3 className="text-xl font-bold mb-4">Location</h3>
            <p className="mb-4">{serviceData.location || "Remote"}</p>

            <h3 className="text-xl font-bold mb-4">Languages Spoken</h3>
            <ul className="list-disc pl-6 mb-4">
              {serviceData.languageSpoken
                  ? serviceData.languageSpoken.split(',').map((language: string, index: number) => (
                      <li key={index}>{language.trim()}</li>
                  ))
                  : <>
                    <li>Thai</li>
                    <li>English</li>
                    <li>Chinese</li>
                  </>}
            </ul>

            {serviceData.serviceRequestDTO && (
                <>
                  <h3 className="text-xl font-bold mb-4">Submission Deadline</h3>
                  <p className="mb-4">{serviceData.serviceRequestDTO.submissionDeadline || "10/8/2024"}</p>

                  <h3 className="text-xl font-bold mb-4">Examples of Work</h3>
                  <p className="mb-4">{serviceData.serviceRequestDTO.workExample || "example"}</p>
                </>
            )}
          </div>
        </section>
      </div>
  );
};

export default JobDescription;
