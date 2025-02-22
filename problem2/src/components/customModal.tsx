import { Dialog, Transition } from "@headlessui/react";
import { Dispatch, Fragment, ReactNode, SetStateAction } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

type LoaderComponent = () => JSX.Element;
interface CustomModalProps {
  title?: string;
  children: ReactNode;
  setShouldOpen: Dispatch<SetStateAction<boolean>>;
  shouldOpen: boolean;
  isLoading?: boolean;
  loaderComponent?: LoaderComponent | undefined;
}

export default function CustomModal({
  title,
  children,
  shouldOpen,
  setShouldOpen,
  isLoading,
  loaderComponent: LoaderComponent,
}: CustomModalProps) {
  function closeModal() {
    setShouldOpen(false);
  }

  return (
    <Transition appear show={shouldOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {isLoading && LoaderComponent ? (
                LoaderComponent
              ) : (
                <Dialog.Panel className="z-50 w-full flex flex-col gap-6 max-w-md max-h-md transform overflow-hidden rounded-2xl bg-blue p-0 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-between text-xl font-bold leading-6 text-white p-4"
                  >
                    <span>{title}</span>
                    <AiFillCloseCircle
                      className="cursor-pointer focus:animate-bounce"
                      onClick={() => closeModal()}
                    />
                  </Dialog.Title>
                  <div> {children}</div>
                </Dialog.Panel>
              )}
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
