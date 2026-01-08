


// import { Navigate } from "react-router-dom";

// const RequirePermissionRoute = ({ user, moduleName, action, element, fallback = "/unauthorized" }) => {
//   const hasPermission = user?.permissions?.some(
//     (perm) => perm.module === moduleName && perm[action]
//   );

//   if (user.role === "user" && !hasPermission) {
//     return <Navigate to={fallback} replace />;
//   }

//   return element;
// };

// export default RequirePermissionRoute;


// components/protected_route/RequirePermissionRoute.jsx
import { Navigate } from "react-router-dom";

const RequirePermissionRoute = ({
  user,
  moduleName,
  action,
  element,
  fallback = "/unauthorized",
}) => {
  // 1️⃣ If user data hasn’t loaded yet
  if (user === undefined || user === null) {
    // you can return a loader here if you want
    return null;
  }

  // 2️⃣ If user not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3️⃣ Admins always have full access
  if (user.role === "admin") {
    return element;
  }

  // 4️⃣ Check if the user has permission for this module + action
  const hasPermission = user?.permissions?.some((perm) => {
    return (
      perm?.module?.toLowerCase() === moduleName.toLowerCase() &&
      perm?.[action] === true
    );
  });

  // 5️⃣ If permission missing → redirect to fallback page
  if (!hasPermission) {
    return <Navigate to={fallback} replace />;
  }

  // 6️⃣ All good → render the target component
  return element;
};

export default RequirePermissionRoute;





// components/protected_route/RequirePermissionRoute.jsx
// import { Navigate } from "react-router-dom";

// const normalize = (v) => (typeof v === "string" ? v.trim().toLowerCase() : "");

// const RequirePermissionRoute = ({
//   user,
//   moduleName,
//   action,      // e.g. "canVisit"
//   element,
//   fallback = "/unauthorized",
// }) => {
//   // If no user object at all -> force login
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // Admin bypass
//   if (user.role === "admin") {
//     return element;
//   }

//   const wantModule = normalize(moduleName);

//   const hasPermission = (user.permissions || []).some((perm) => {
//     if (!perm) return false;

//     // module could be stored as module or title
//     const permModule = normalize(perm.module || perm.title || "");

//     if (permModule !== wantModule) return false;

//     // action can be stored as: canVisit, visit, add, etc.
//     // build candidate keys to check
//     const candidates = [
//       action, // "canVisit"
//       // "visit" from "canVisit"
//       action.replace(/^can/i, (m) => ""),
//       // lowercase versions
//       action.toLowerCase(),
//       action.replace(/^can/i, "").toLowerCase(),
//       // sometimes frontend uses 'visit', 'add', 'view' keys directly
//     ].filter(Boolean);

//     // check any candidate key equals true
//     return candidates.some((key) => {
//       // guard for nested shapes and boolean values
//       return perm?.[key] === true;
//     });
//   });

//   if (!hasPermission) {
//     return <Navigate to={fallback} replace />;
//   }

//   return element;
// };

// export default RequirePermissionRoute;
