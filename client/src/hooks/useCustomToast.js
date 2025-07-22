import { useToast } from '@chakra-ui/react';

const useCustomToast = () => {
  const toast = useToast();

  const showToast = (title, description, status = 'success') => {
    toast({
      title,
      description,
      status,
      duration: 3000,
      isClosable: true,
      position: 'top-right',
      variant: 'solid',
    });
  };

  return {
    showSuccessToast: (title, description) => showToast(title, description, 'success'),
    showErrorToast: (title, description) => showToast(title, description, 'error'),
    showInfoToast: (title, description) => showToast(title, description, 'info'),
    showWarningToast: (title, description) => showToast(title, description, 'warning'),
  };
};

export default useCustomToast; 