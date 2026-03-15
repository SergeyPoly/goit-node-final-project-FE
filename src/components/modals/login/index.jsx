import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useModalStore } from '@/entities/modal/store/use-modal-store';
import { FormField } from '@/shared/ui/FormField';
import { Button } from '@/shared/ui/Button';
import { MODAL_NAMES } from '@/entities/modal/constants';

import { initialValues, validationSchema } from './form';
import { useLoginFormSubmit } from './hooks';

export const LoginModal = () => {
  const { setCurrentModal, currentModal } = useModalStore();
  const { handleLoginFormSubmit, isPending } = useLoginFormSubmit();

  const { handleSubmit, errors, touched, isValid, dirty, getFieldProps } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleLoginFormSubmit,
  });

  const handleSwitchToRegister = () => {
    setCurrentModal(MODAL_NAMES.REGISTER, currentModal?.data);
  };

  return (
    <>
      <h2 className="text-dark mb-10 text-2xl font-extrabold uppercase md:text-3xl lg:text-4xl">
        Sign In
      </h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField
          {...getFieldProps('email')}
          placeholder="Email*"
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
          className="w-full disabled:cursor-default!"
          disabled={isPending || !isValid || !dirty}
        >
          {isPending ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-[#BFBFBE]">
        Don&apos;t have an account?{' '}
        <button type="button" onClick={handleSwitchToRegister} className="text-main">
          Create an account
        </button>
      </p>
    </>
  );
};
