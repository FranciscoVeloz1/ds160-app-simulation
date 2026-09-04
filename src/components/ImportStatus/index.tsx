import styles from "./ImportStatus.module.css";

export type ImportStatusState = {
  kind: "ok" | "error";
  text: string;
};

type ImportStatusProps = {
  status: ImportStatusState | null;
};

export function ImportStatus({ status }: ImportStatusProps) {
  if (!status) {
    return null;
  }

  const className =
    status.kind === "ok"
      ? `${styles.status} ${styles.ok}`
      : `${styles.status} ${styles.error}`;

  return (
    <p className={className} role={status.kind === "error" ? "alert" : "status"}>
      {status.text}
    </p>
  );
}
