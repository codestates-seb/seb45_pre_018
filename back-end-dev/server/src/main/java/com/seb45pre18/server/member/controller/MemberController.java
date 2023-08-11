package com.seb45pre18.server.member.controller;

import com.seb45pre18.server.member.dto.MemberDTO;
import com.seb45pre18.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
public class MemberController {

    //생성자 주입
    private  final  MemberService memberService;


    //회원가입 페이지 출력 요청
    @GetMapping("/member/save")
    public String saveForm(){
        return "save";
    }


    @PostMapping("/member/save")
    public String save(@ModelAttribute MemberDTO memberDTO) {
        System.out.println("MemberController.save");
        System.out.println("memberDto = " + memberDTO);
        memberService.save(memberDTO);

        return "login";
    }

    @PostMapping("/member/login")
    public String login(@ModelAttribute MemberDTO memberDTO, HttpSession session){
        MemberDTO loginResult = memberService.login(memberDTO);
        if(loginResult!= null){
            //login 성공
            session.setAttribute("loginId",loginResult.getId());
            return "main";
        }
        else{
            //login 실패
            return "login";
        }
    }
}
