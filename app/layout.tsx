import "./styles.css";

interface Props {
  children: React.ReactNode;
}

const RootLayout: React.FC<Props> = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  return (
    <html lang="en">
      <body>
        <div className={"py-0 px-8 bg-primary"}>
          {children}
          <footer className={"flex items-center justify-center flex-grow"}>
            © Marta Pinedo Sánchez. All right reserved.
          </footer>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
