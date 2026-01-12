/* eslint-disable no-console */
import { useNavigate } from "react-router-dom";
import { routes } from "@/routes/routes";
import { FloatingInput } from "@/shared/components/input-field";
import styles from "./login.module.scss";
import { Button, Image, VStack } from "@chakra-ui/react";
import Eye from "@/assets/icons/Eye";
import { useState, type FormEvent } from "react";
import Hide from "@/assets/icons/Hide";
import { burger } from "@/shared/constants/image-urls";
import { UserLogin } from "../api/authApi";
import { useSharedStorage } from "@/shared/store/shared-store";
import { Roles } from "../models/role-model";

const Login = () => {
  // States
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setSharedStorage = useSharedStorage((state) => state.setSharedStorage);

  // Functions
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await UserLogin({ phoneNumber: phone, password });
      const { fullName, user, policies, token } = response?.data || {};
      if (response.statusCode === 200) {
        setSharedStorage((state) => {
          state.fullName = fullName ?? null;
          state.user = user ?? null;
          state.policies = policies ?? [];
          state.token = token ?? null;
        });
        if (response?.data?.user?.role === Roles.SUPER_ADMIN) {
          navigate(`${routes.admin.name}/${routes.admin.restaurants}`, {
            replace: true,
          });
        } else {
          navigate(routes.dashboard, { replace: true });
        }
      } else {
        console.log("Error while login: ", response?.data);
      }
    } catch (error) {
      console.error("Error while login: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.loginContainer}>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image
            borderRadius="full"
            fit="cover"
            alt="Cash Logo"
            src={burger}
            boxSize="50px"
          />
        </div>
        <form onSubmit={(e) => onSubmit(e)}>
          <VStack gap={5}>
            <FloatingInput
              value={phone}
              label="Phone *"
              maxLength={13}
              type="number"
              onChange={({ target }) => setPhone(target.value)}
            />
            <FloatingInput
              label="Password *"
              type={!showPassword ? "password" : ""}
              value={password}
              maxLength={20}
              onChange={({ target }) => setPassword(target.value)}
              endElement={
                <div
                  className={styles.passwordBtn}
                  onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <Eye /> : <Hide />}
                </div>
              }
            />
            <Button
              disabled={isLoading}
              colorPalette={"blue"}
              type="submit">
              Submit
            </Button>
          </VStack>
        </form>
      </div>
    </div>
  );
};

export { Login };
