import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useModalStore } from '@/entities/modal/store/use-modal-store.js';
import { FormField } from '@/shared/ui/FormField.jsx';
import { Button } from '@/shared/ui/Button.jsx';
import { MODAL_NAMES } from '@/entities/modal/constants.js';

import { initialValues, validationSchema } from './form.js';
import { useRegisterFormSubmit } from './hooks/index.js';

export const RegisterModal = () => {
  const { setCurrentModal, currentModal } = useModalStore();
  const { handleRegisterFormSubmit, isPending } = useRegisterFormSubmit();

  const { handleSubmit, errors, touched, isValid, dirty, getFieldProps } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleRegisterFormSubmit,
  });

  const handleSwitchToLogin = () => {
    setCurrentModal(MODAL_NAMES.LOGIN, currentModal?.data);
  };

  return (
    <>
      <h2 className="text-dark mb-10 text-2xl font-extrabold uppercase md:text-3xl lg:text-4xl">
        Sign Up
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField
          {...getFieldProps('name')}
          placeholder="Name*"
          error={touched.name && errors.name}
        />
        <FormField
          {...getFieldProps('email')}
          placeholder="Email*"
          type="email"
          error={touched.email && errors.email}
        />
        <FormField
          {...getFieldProps('password')}
          placeholder="Password"
          type="password"
          iconClass="w-4.5 h-4.5 tablet:w-5 tablet:h-5"
          containerClassName="mb-6"
          error={touched.password && errors.password}
        />

        <Button
          type="submit"
          variant="dark"
          className="w-full"
          disabled={isPending || !isValid || !dirty}
        >
          {isPending ? 'creating...' : 'create'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-[#BFBFBE]">
        I already have an account?{' '}
        <button type="button" onClick={handleSwitchToLogin} className="text-main hover:underline">
          Sign in
        </button>
      </p>
    </>
  );
};
