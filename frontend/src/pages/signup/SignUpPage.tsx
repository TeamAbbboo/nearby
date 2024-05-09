import Signup from '@/components/signup/Signup';
import { motion } from 'framer-motion';

const SignupPage = () => {
  return (
    <div className="w-full h-full bg-LOGIN bg-cover flex flex-col">
      <div className="pl-5 pt-10 text-2xl font-bold">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>
            가족들에게
            <br />
            마음을 전달하세요
          </p>
        </motion.div>
      </div>

      {/* 닉네임-생년월일-시작하기버튼 */}
      <div className="w-full h-full">
        <Signup />
      </div>
    </div>
  );
};

export default SignupPage;
