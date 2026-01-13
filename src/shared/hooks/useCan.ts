import type { PermissionString } from "../models/policy/policy";
import { useSharedStorage } from "../store/shared-store";

const useCan = (policy: PermissionString) => {
  const policies = useSharedStorage((state) => state.policies);
  if (policies?.includes(policy)) return true;
  return false;
};

export default useCan;
