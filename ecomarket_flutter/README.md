# EcoMarket

Aplicativo Flutter baseado no layout enviado, com as telas:

- Splash
- Login
- Criar conta

## Estrutura

```text
lib/
├── main.dart
├── theme/
│   └── app_colors.dart
├── widgets/
│   ├── custom_text_field.dart
│   ├── ecomarket_logo.dart
│   └── green_button.dart
└── screens/
    ├── splash_screen.dart
    ├── login_screen.dart
    └── register_screen.dart
```

## Como rodar

1. Crie/abra o projeto no VS Code ou Android Studio.
2. Tenha o Flutter instalado.
3. Rode:

```bash
flutter pub get
flutter run
```

As funções de login, Google e recuperação de senha estão como botões visuais por enquanto. Depois dá para ligar com uma API/banco de dados.
