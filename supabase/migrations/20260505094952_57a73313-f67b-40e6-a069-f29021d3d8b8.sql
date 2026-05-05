CREATE POLICY "admins view all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins view all subscriptions" ON public.subscriptions FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins view all chat_messages" ON public.chat_messages FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins view all playbook_runs" ON public.playbook_runs FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "admins view all playbook_step_progress" ON public.playbook_step_progress FOR SELECT USING (public.has_role(auth.uid(), 'admin'));