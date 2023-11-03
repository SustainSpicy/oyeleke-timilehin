import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSnapshot } from "valtio";
import { converterStore } from "../../constants/store";

interface MyModalProps {
  children: ReactNode;
}
export default function MyModal({ children }: MyModalProps) {
  const snapshot = useSnapshot(converterStore);
  const { isOpen } = snapshot;

  function closeModal() {
    converterStore.isOpen = { modal: "", open: false };
  }

  return (
    <Transition appear show={isOpen.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
              <Dialog.Panel className="z-50 w-full flex flex-col gap-6 max-w-md max-h-md transform overflow-hidden rounded-2xl bg-blue p-0 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex justify-between text-xl font-bold leading-6 text-white p-4"
                >
                  <span>Select a token</span>
                  <AiFillCloseCircle
                    className="cursor-pointer focus:animate-bounce"
                    onClick={() => closeModal()}
                  />
                </Dialog.Title>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
