import React, { useState } from 'react';
import { VStack, Button, Box, Icon, Text, Input } from '@chakra-ui/react';
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control';
import { useFormContext, Controller, UseFormReturn } from 'react-hook-form';
import { Form2Data } from '../../interfaces/form2Data';
import { LuUpload } from 'react-icons/lu';

interface Step2FormProps {
    onSubmit: (data: Form2Data) => void;
    methods: UseFormReturn<Form2Data>;
    errors: UseFormReturn<Form2Data>['formState']['errors'];
}

const Step2Form: React.FC<Step2FormProps> = ({ onSubmit, errors }) => {
    const { handleSubmit, control } = useFormContext<Form2Data>();
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (value: File | undefined) => void
    ) => {
        const files = e.target.files;
        onChange(files ? files[0] : undefined);
        setFileName(files && files[0] ? files[0].name : null);

        // const file = e.target.files?.[0] || null;
        // onChange(file);
        // setFileName(file ? file.name : null);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <VStack align="stretch">
                <FormControl isInvalid={!!errors.avatar}>
                    <Controller
                        name="avatar"
                        control={control}
                        defaultValue={null}
                        render={({ field: { onChange } }) => (
                            <Box
                                border="2px dashed"
                                borderColor="teal.400"
                                borderRadius="md"
                                p={4}
                                _hover={{ borderColor: 'teal.500' }}
                                textAlign="center"
                                cursor="pointer"
                                onClick={() =>
                                    document
                                        .getElementById('file-input')
                                        ?.click()
                                }
                            >
                                <Input
                                    id="file-input"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={(e) =>
                                        handleFileChange(e, onChange)
                                    }
                                />
                                <Icon
                                    id="file-input-icon"
                                    as={LuUpload}
                                    w={10}
                                    h={10}
                                    color="teal.500"
                                />
                                <Box mt={2}>
                                    Drag and drop your avatar here or click to
                                    upload
                                </Box>
                                <Box color="gray.500" fontSize="sm">
                                    .png, .jpg up to 5MB
                                </Box>
                                {fileName && (
                                    <Text mt={2} fontSize="sm" color="gray.600">
                                        Selected file:{' '}
                                        <strong>{fileName}</strong>
                                    </Text>
                                )}
                            </Box>
                        )}
                    />
                    <FormErrorMessage>
                        {errors.avatar?.message}
                    </FormErrorMessage>
                </FormControl>

                <Button
                    type="submit"
                    colorScheme="teal"
                    size="lg"
                    fontWeight="bold"
                    _hover={{ bg: 'teal.600' }}
                >
                    Submit
                </Button>
            </VStack>
        </form>
    );
};

export default Step2Form;
