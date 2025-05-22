import React, { useState } from 'react';
import { Form1Data } from '../interfaces/form1Data';
import { Interest } from '../interfaces/interest';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@chakra-ui/react';
import { useFetch } from '../hooks/useFetch';
import Step1Form from '../components/steps/step1Form';
import { step1Schema } from '../schemas/formSchemas';

const mockInterestsEndpoint = '/api/interests';

const RegistrationForm: React.FC = () => {
    const [step, setStep] = useState(1);
    const { data: interests, error: fetchError } = useFetch<Interest[]>(
        mockInterestsEndpoint
    );

    const methodsStep1 = useForm<Form1Data>({
        resolver: zodResolver(step1Schema),
        defaultValues: { interests: [] },
    });

    if (fetchError) {
        console.error('Error loading interests:', fetchError);
    }

    const onSubmitStep1 = (data: Form1Data) => {
        console.log('Step 1 Data:', data);
        setStep(2);
    };

    return (
        <Box p={6} maxW="lg" mx="auto">
            {step === 1 && (
                <FormProvider {...methodsStep1}>
                    <Step1Form
                        onSubmit={onSubmitStep1}
                        methods={methodsStep1}
                        errors={methodsStep1.formState.errors}
                        interests={interests ?? []}
                    />
                </FormProvider>
            )}
        </Box>
    );
};

export default RegistrationForm;
