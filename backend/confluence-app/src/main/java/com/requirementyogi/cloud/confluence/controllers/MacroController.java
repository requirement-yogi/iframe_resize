package com.requirementyogi.cloud.confluence.controllers;

import com.atlassian.connect.spring.AtlassianHostUser;
import com.requirementyogi.cloud.common.config.AddonConfiguration;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/macros")
@RequiredArgsConstructor
public class MacroController {

    private final AddonConfiguration addonConfiguration;

    @GetMapping("/requirement")
    public String getRequirementMacro(
        @RequestParam(name = "spaceKey") String spaceKey,
        @RequestParam(name = "key") String key,
        @AuthenticationPrincipal AtlassianHostUser hostUser,
        Model model
    ) {
        model.addAttribute("key", key);
        model.addAttribute("url", getRequirementLink(spaceKey, key, hostUser));
        return "requirement-macro";
    }

    private String getRequirementLink(String spaceKey, String key, AtlassianHostUser hostUser) {
        return hostUser.getHost().getBaseUrl() + "/display/" + spaceKey + "/customcontent/list/ac:" +
            addonConfiguration.getKey() + ":requirements?ac.key=" + key;
    }

}
