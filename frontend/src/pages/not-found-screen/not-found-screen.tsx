function NotFoundScreen(): JSX.Element {
  return (
    <div>
      <main className="page-content">
        <div className="container">
          <section className="error">
            <h1 className="error__title">404</h1><span className="error__subtitle">Страница не найдена.</span>
            <p className="error__text"> Возможно, страница была удалена или <br /> её вовсе не существовало.</p>
          </section>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;
