// import styles from "../styles/Card.module.css";
// import { cn } from "../utils/classNames";

// export function Card({ children, className, ...props }) {
//   return (
//     <div
//       className={cn(styles.container, className)}
//       {...props}>
//       {children}
//     </div>
//   );
// }

// Card.Header = ({ children, className }) => (
//   <h2 className={cn(styles.header, className)}>{children}</h2>
// );

// Card.Content = ({ children, className }) => (
//   <div className={cn(styles.content, className)}>{children}</div>
// );

// Card.Footer = ({ children, className }) => (
//   <div className={cn(styles.footer, className)}>{children}</div>
// );

/**
 * @implements
 *
 */

// import { Card } from './components/Card';
// import { Button } from './components/Button';

// function App() {
//   return (
//     <Card>
//       <Card.Header>Welcome to My App</Card.Header>
//       <Card.Content>
//         This is a card component with styles defined in separate CSS files.
//         The classes are imported as named modules.
//       </Card.Content>
//       <Card.Footer>
//         <Button.Secondary>Cancel</Button.Secondary>
//         <Button.Primary size="large">Save Changes</Button.Primary>
//       </Card.Footer>
//     </Card>
//   );
// }

/**
 * @implement dynamic class
 */

// import { cn } from '../utils/classNames';
// import styles from '../styles/Button.module.css';

// function Button({ variant = 'primary', size, className, ...props }) {
//   return (
//     <button
//       className={cn(
//         styles.btn,
//         styles[variant],
//         size && styles[size],
//         className // Allows overriding
//       )}
//       {...props}
//     />
//   );
// }
