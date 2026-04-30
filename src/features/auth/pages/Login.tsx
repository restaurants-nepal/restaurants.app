/* eslint-disable no-console */
import { useNavigate } from "react-router-dom";
import { routes } from "@/routes/routes";
import { FloatingInput } from "@/shared/components/input-field";
import styles from "./login.module.scss";
import { Button, Image, VStack } from "@chakra-ui/react";
import Eye from "@/assets/icons/Eye";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Hide from "@/assets/icons/Hide";
import { burger } from "@/shared/constants/image-urls";
import { UserLogin } from "../api/authApi";
import { useSharedStorage } from "@/shared/store/shared-store";
import { Roles } from "../models/role-model";
import { useIsAuthenticated } from "@/routes/auth";
import useNavigatePage from "@/shared/hooks/useNavigatePage";
import CustomCursor from "../components/CustomCursor";
import RestaurantScene from "../components/RestaurantScene";

const Login = () => {
  // ── Form state ──
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setSharedStorage = useSharedStorage((state) => state.setSharedStorage);
  const user = useSharedStorage((state) => state.user);
  const isAuthenticated = useIsAuthenticated();

  // ── Mouse tracking ──
  const mouseRef = useRef({ x: 0, y: 0, px: -1000, py: -1000 });
  const [isInsideModal, setIsInsideModal] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.px = e.clientX;
      mouseRef.current.py = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const handleModalEnter = useCallback(() => setIsInsideModal(true), []);
  const handleModalLeave = useCallback(() => setIsInsideModal(false), []);

  // ── Hooks ──
  const navigateByRole = useNavigatePage();
  const navigate = useNavigate();

  // ── Submit ──
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await UserLogin({ phoneNumber: phone, password });
      const { fullName, user, policies, token, restaurantId } =
        response?.data || {};
      if (response.statusCode === 200) {
        setSharedStorage((state) => {
          state.fullName = fullName ?? null;
          state.user = user ?? null;
          state.policies = policies ?? [];
          state.token = token ?? null;
          state.restaurantId = restaurantId;
        });
        navigateByRole(user?.role);
      } else {
        console.log("Error while login: ", response?.data);
      }
    } catch (error) {
      console.error("Error while login: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Auth redirect ──
  useEffect(() => {
    if (isAuthenticated) {
      navigateByRole(user?.role as Roles);
    } else {
      navigate(routes.login);
    }
  }, [navigate, isAuthenticated, user?.role, navigateByRole]);

  return (
    <div
      className={`${styles.loginContainer} ${isInsideModal ? "" : styles.hideCursor}`}
    >
      {/* Custom cursor (hidden when inside modal) */}
      <CustomCursor isInsideModal={isInsideModal} />

      {/* Background scene: parallax image + particles */}
      <RestaurantScene mouseRef={mouseRef} />

      {/* Login card */}
      <div
        className={styles.content}
        onMouseEnter={handleModalEnter}
        onMouseLeave={handleModalLeave}
      >
        <div className={styles.image}>
          <Image
            borderRadius="full"
            fit="cover"
            alt="Cash Logo"
            src={burger}
            boxSize="50px"
          />
        </div>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Sign in to your restaurant dashboard</p>
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
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <Eye /> : <Hide />}
                </div>
              }
            />
            <Button disabled={isLoading} colorPalette={"blue"} type="submit">
              Submit
            </Button>
          </VStack>
        </form>
      </div>
    </div>
  );
};

export { Login };
