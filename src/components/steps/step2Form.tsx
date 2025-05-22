import React from 'react';
import { VStack, Input, Button } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { Form2Data } from '../../interfaces/form2Data';

interface Step2FormProps {
    onSubmit: (data: Form2Data) => void;
    methods: UseFormReturn<Form2Data>;
    errors: UseFormReturn<Form2Data>['formState']['errors'];
}

const Step2Form: React.FC<Step2FormProps> = ({ onSubmit, errors }) => {
    const { register, handleSubmit } = useFormContext<Form2Data>();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
                <FormControl isInvalid={!!errors.avatar}>
                    <FormLabel>Upload Avatar</FormLabel>
                    <Input type="file" {...register('avatar')} />
                </FormControl>

                <Button type="submit">Submit</Button>
            </VStack>
        </form>
    );
};

export default Step2Form;
