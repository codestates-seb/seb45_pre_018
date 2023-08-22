package com.seb45pre18.server.member.controller;

import com.seb45pre18.server.member.dto.MemberDTO;
import com.seb45pre18.server.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@RequiredArgsConstructor
public class MemberController {
    // 생성자 주입
    private final MemberService memberService;

    // 회원가입 페이지 출력 요청
    @GetMapping("/member/save")
    public String saveForm() {
        return "save";
    }

    @PostMapping("/member/save")
    public String save(@ModelAttribute MemberDTO memberDTO) {
        System.out.println("MemberController.save");
        System.out.println("memberDTO = " + memberDTO);
        memberService.save(memberDTO);
        return "login";
    }
    //  로그인
    @GetMapping("/member/login")
    public String loginForm() {
        return "login";
    }

    @PostMapping("/member/login")
    public String login(@ModelAttribute MemberDTO memberDTO, HttpSession session) {
        MemberDTO loginResult = memberService.login(memberDTO);
        if (loginResult != null) {
            // login 성공
            session.setAttribute("login_memberId", loginResult.getMemberId());
            return "main";
        } else {
            // login 실패
            return "login";
        }
    }
    //  회원목록
    @GetMapping("/member/")
    public String findAll(Model model) {
        List<MemberDTO> memberDTOList = memberService.findAll();
        // 어떠한 html로 가져갈 데이터가 있다면 model사용
        model.addAttribute("memberList", memberDTOList);
        return "list";
    }

    @GetMapping("/member/{id}")
    public String findById(@PathVariable Long id, Model model) {
        MemberDTO memberDTO = memberService.findById(id);
        model.addAttribute("member", memberDTO);
        return "detail";
    }
    //  회원정보 수정
    @GetMapping("/member/update")
    public String updateForm(HttpSession session, Model model) {
        String memberId = (String) session.getAttribute("login_memberId");
        System.out.println("myId: " + memberId);
//        현재 로그인된 사용자의 아이디를 가져와서 해당 사용자의 정보를 가져옴
        MemberDTO memberDTO = memberService.updateForm(memberId);
        if(memberDTO == null){
            System.out.println("memberDTO is null");
        }else {
            MemberDTO updatedMemberDTO = new MemberDTO();
            updatedMemberDTO.setId(memberDTO.getId());
            updatedMemberDTO.setMemberId(memberDTO.getMemberId());
            updatedMemberDTO.setPassword(" ");// 기존 비밀번호 미리설정
            updatedMemberDTO.setName(memberDTO.getName());

            model.addAttribute("updateMember", updatedMemberDTO);

        }
        return "update";
    }

    @PostMapping("/member/update")
    public String update(@ModelAttribute MemberDTO memberDTO, Model model) {
        memberService.update(memberDTO);
        MemberDTO updatedMemberDTO = memberService.findById(memberDTO.getId());
        model.addAttribute("member", updatedMemberDTO);
        return "redirect:/member/login";
    }
    //  회원정보 삭제
    @GetMapping("/member/delete/{id}")
    public String deleteById(@PathVariable Long id) {
        memberService.deleteById(id);
        return "redirect:/member/";
    }
    //  로그아웃
    @GetMapping("/member/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "index";
    }



}
