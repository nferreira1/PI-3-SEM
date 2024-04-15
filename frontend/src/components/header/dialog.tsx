import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  DialogContent as Content,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import FormCriarConta from "./form-criar-conta";
import FormLogin from "./form-login";

const DialogContent = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const variants = {
    enter: (isLogin: boolean) => ({
      x: !isLogin ? 500 : -500,
    }),
    center: {
      x: 0,
      transition: { type: "tween" },
    },
    exit: (isLogin: boolean) => ({
      x: !isLogin ? -500 : 500,
      transition: { type: "tween" },
    }),
  };

  return (
    <Content className="rounded-2xl w-min overflow-hidden">
      <DialogHeader>
        <AnimatePresence mode="wait" initial={false} custom={isLogin}>
          <motion.div
            key={isLogin ? "login" : "criar-conta"}
            custom={isLogin}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            {isLogin ? (
              <>
                <DialogTitle className="text-center font-bold">
                  Faça login na plataforma
                </DialogTitle>
                <DialogDescription className="text-center text-gray-400">
                  Conecte-se usando o seu e-mail e a sua senha.
                </DialogDescription>
              </>
            ) : (
              <>
                <DialogTitle className="text-center font-bold">
                  Crie a sua conta em nossa plataforma
                </DialogTitle>
                <DialogDescription className="text-center text-gray-400">
                  Faça o seu cadastro e comece a usar a nossa plataforma.
                </DialogDescription>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </DialogHeader>

      <AnimatePresence mode="wait" initial={false} custom={isLogin}>
        <motion.div
          key={isLogin ? "login" : "criar-conta"}
          custom={isLogin}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full"
        >
          <DialogFooter>
            {isLogin ? (
              <FormLogin setIsLogin={setIsLogin} />
            ) : (
              <FormCriarConta setIsLogin={setIsLogin} />
            )}
          </DialogFooter>
        </motion.div>
      </AnimatePresence>
    </Content>
  );
};

export default DialogContent;
