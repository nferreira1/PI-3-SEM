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
  const [isLogin, setIsLogin] = useState<{ isLogin: boolean; email: string }>({
    isLogin: true,
    email: "",
  });

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
        <AnimatePresence mode="wait" initial={false} custom={isLogin.isLogin}>
          <motion.div
            key={isLogin.isLogin ? "login" : "criar-conta"}
            custom={isLogin.isLogin}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full"
          >
            {isLogin.isLogin ? (
              <>
                <DialogTitle className="text-center font-bold">
                  Faça login na plataforma
                </DialogTitle>
                <DialogDescription className="text-center text-muted-foreground">
                  Conecte-se usando o seu e-mail e a sua senha.
                </DialogDescription>
              </>
            ) : (
              <>
                <DialogTitle className="text-center font-bold">
                  Crie a sua conta em nossa plataforma
                </DialogTitle>
                <DialogDescription className="text-center text-muted-foreground">
                  Faça o seu cadastro e comece a usar a nossa plataforma.
                </DialogDescription>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </DialogHeader>

      <AnimatePresence mode="wait" initial={false} custom={isLogin.isLogin}>
        <motion.div
          key={isLogin.isLogin ? "login" : "criar-conta"}
          custom={isLogin.isLogin}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="w-full"
        >
          <DialogFooter>
            {isLogin.isLogin ? (
              <FormLogin setIsLogin={setIsLogin} email={isLogin.email} />
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
