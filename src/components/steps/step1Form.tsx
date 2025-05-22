import React from 'react';
import {
    VStack,
    Input,
    Checkbox,
    Button,
    CheckboxGroup,
    Stack,
    CheckboxRoot,
} from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { UseFormReturn } from 'react-hook-form';
import { Form1Data } from '../../interfaces/form1Data';
import { Interest } from '../../interfaces/interest';

interface Step1FormProps {
    onSubmit: (data: Form1Data) => void;
    errors: UseFormReturn<Form1Data>['formState']['errors'];
    interests: Interest[];
    methods: UseFormReturn<Form1Data>;
}

const Step1Form: React.FC<Step1FormProps> = ({
    onSubmit,
    methods,
    errors,
    interests,
}) => {
    const { register } = methods;

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <VStack>
                <FormControl isInvalid={!!errors.names}>
                    <FormLabel>Names</FormLabel>
                    <Input {...register('names')} />
                </FormControl>

                <FormControl isInvalid={!!errors.password}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" {...register('password')} />
                </FormControl>

                <FormControl isInvalid={!!errors.confirmPassword}>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input type="password" {...register('confirmPassword')} />
                </FormControl>

                <FormControl isInvalid={!!errors.interests}>
                    <FormLabel>Interests</FormLabel>
                    <CheckboxGroup>
                        <Stack>
                            {interests.map((interest) => (
                                <CheckboxRoot
                                    key={interest.id}
                                    value={interest.id.toString()}
                                    {...methods.register('interests')}
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                    <Checkbox.Label>
                                        {interest.name}
                                    </Checkbox.Label>
                                </CheckboxRoot>
                            ))}
                        </Stack>
                    </CheckboxGroup>
                </FormControl>

                <Button type="submit">Next</Button>
            </VStack>
        </form>
    );
};

export default Step1Form;
