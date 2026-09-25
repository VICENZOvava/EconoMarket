import 'package:flutter/material.dart';
import '../theme/app_colors.dart';
import '../widgets/custom_text_field.dart';
import '../widgets/green_button.dart';

class RegisterScreen extends StatelessWidget {
  const RegisterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.fromLTRB(28, 20, 28, 30),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              GestureDetector(
                onTap: () => Navigator.pop(context),
                child: const Row(
                  children: [
                    Icon(Icons.arrow_back_ios_new_rounded, size: 18),
                    SizedBox(width: 10),
                    Text(
                      'Voltar',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 34),
              const Text(
                'Criar conta 🌿',
                style: TextStyle(
                  color: AppColors.text,
                  fontSize: 29,
                  fontWeight: FontWeight.w800,
                  letterSpacing: -.7,
                ),
              ),
              const SizedBox(height: 8),
              const Text(
                'Junte-se a milhares que economizam todo mês',
                style: TextStyle(
                  color: Color(0xFFAAAAAA),
                  fontSize: 15,
                ),
              ),
              const SizedBox(height: 34),
              const _Label('Nome completo'),
              const SizedBox(height: 9),
              const CustomTextField(hint: 'Ana Paula Silva'),
              const SizedBox(height: 19),
              const _Label('E-mail'),
              const SizedBox(height: 9),
              const CustomTextField(
                hint: 'ana@email.com',
                keyboardType: TextInputType.emailAddress,
              ),
              const SizedBox(height: 19),
              const _Label('Senha'),
              const SizedBox(height: 9),
              const CustomTextField(
                hint: '•••••••••',
                obscureText: true,
              ),
              const SizedBox(height: 19),
              const _Label('Confirmar senha'),
              const SizedBox(height: 9),
              const CustomTextField(
                hint: '•••••••••',
                obscureText: true,
              ),
              const SizedBox(height: 24),
              GreenButton(
                text: 'Criar conta',
                onPressed: () {
                  Navigator.pop(context);
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Label extends StatelessWidget {
  final String text;

  const _Label(this.text);

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: const TextStyle(
        color: AppColors.text,
        fontSize: 14,
        fontWeight: FontWeight.w700,
      ),
    );
  }
}
