'use client'

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { MoveRight, X } from 'lucide-react';

const BANNER_HIDDEN_KEY = 'newsletterBannerHidden';
const BANNER_HIDDEN_DATE_KEY = 'newsletterBannerHiddenDate';
const BANNER_HIDE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
const BANNER_AUTO_DISMISS_DURATION = 60000; // 60 seconds

export default function NewsletterBanner() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const bannerHidden = localStorage.getItem(BANNER_HIDDEN_KEY);
            const bannerHiddenDate = localStorage.getItem(BANNER_HIDDEN_DATE_KEY);

            if (bannerHidden === 'true' && bannerHiddenDate) {
                const hiddenTime = new Date(bannerHiddenDate).getTime();
                const currentTime = new Date().getTime();

                if (currentTime - hiddenTime > BANNER_HIDE_DURATION) {
                    localStorage.removeItem(BANNER_HIDDEN_KEY);
                    localStorage.removeItem(BANNER_HIDDEN_DATE_KEY);
                    setShowBanner(true);
                }
            } else {
                setShowBanner(true);
            }
        }
    }, []);

    useEffect(() => {
        if (showBanner) {
            const timer = setTimeout(() => {
                dismissBanner();
            }, BANNER_AUTO_DISMISS_DURATION);

            return () => clearTimeout(timer);
        }
    }, [showBanner]);

    const dismissBanner = () => {
        setShowBanner(false);
        localStorage.setItem(BANNER_HIDDEN_KEY, 'true');
        localStorage.setItem(BANNER_HIDDEN_DATE_KEY, new Date().toISOString());
    };

    if (!showBanner) return null;

    return (
        <section className="py-3 bg-primary flex items-center justify-between px-4 md:px-20">
            <div className="flex mx-auto gap-2 text-sm sm:text-base">
                Get the Latest Tips & Recipes Straight to your Inbox.{" "}
                <Link href="/newsletter" className="inline-flex items-center gap-2 transit font-title hover:scale-105">
                    Subscribe <MoveRight size={20} />
                </Link>
            </div>
            <button
                type="button"
                className="flex p-1 bg-transparent group rounded border border-transparent transit hover:border-foreground"
                onClick={dismissBanner}
                aria-label="Dismiss newsletter banner"
            >
                <X size={20} className="group-hover:scale-105" />
            </button>
        </section>
    );
}