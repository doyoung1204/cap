import { json } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';

export async function POST({ request }) {
	const { email } = await request.json();

	if (!email || !email.includes('@')) {
		return json({ error: '올바른 이메일 주소를 입력해주세요.' }, { status: 400 });
	}

	try {
		// 사용자 확인
		const user = await prisma.user.findUnique({ where: { email } });
		if (!user) {
			return json({ error: '해당 이메일로 가입된 사용자가 없습니다.' }, { status: 404 });
		}

		// 임시 비밀번호 생성
		const tempPassword = Math.random().toString(36).slice(-10);

		// 비밀번호 해싱
		const hashed = await bcrypt.hash(tempPassword, 10);

		// 비밀번호 업데이트
		await prisma.user.update({
			where: { email },
			data: { password: hashed }
		});

		console.log('📨 메일 전송 시도 중...');

		// 이메일 발송기 설정 (Gmail 기준)
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'gimgyoyeon759@gmail.com',      // ✅ 실제 Gmail 주소로 교체
				pass: 'czpu njof vtvs gbwr'          // ✅ 생성한 앱 비밀번호로 교체
			}
		});

		// 이메일 전송
		await transporter.sendMail({
			from: '엘리 챗봇 <your_email@gmail.com>',
			to: email,
			subject: '임시 비밀번호 안내',
			html: `
				<p>안녕하세요, 엘리 챗봇입니다.</p>
				<p>요청하신 임시 비밀번호는 <b>${tempPassword}</b> 입니다.</p>
				<p>로그인 후 반드시 비밀번호를 변경해주세요.</p>
			`
		});

		console.log('✅ 메일 전송 성공');

		return json({ message: '임시 비밀번호가 이메일로 전송되었습니다.' });
	} catch (err) {
		console.error('❌ 오류 발생:', err);
		return json({ error: '서버 오류로 인해 이메일 전송에 실패했습니다.' }, { status: 500 });
	}
}
