export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          address_line1: string
          address_line2: string | null
          city: string
          company: string | null
          country_code: string
          created_at: string | null
          customer_id: string
          first_name: string
          gst_number: string | null
          id: string
          is_default: boolean | null
          last_name: string
          phone: string | null
          postal_code: string
          state: string
          type: string | null
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          city: string
          company?: string | null
          country_code?: string
          created_at?: string | null
          customer_id: string
          first_name: string
          gst_number?: string | null
          id?: string
          is_default?: boolean | null
          last_name: string
          phone?: string | null
          postal_code: string
          state: string
          type?: string | null
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          city?: string
          company?: string | null
          country_code?: string
          created_at?: string | null
          customer_id?: string
          first_name?: string
          gst_number?: string | null
          id?: string
          is_default?: boolean | null
          last_name?: string
          phone?: string | null
          postal_code?: string
          state?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "addresses_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      admin_users: {
        Row: {
          auth_user_id: string | null
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          last_login_at: string | null
          name: string
          permissions: Json | null
          role: string
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          name: string
          permissions?: Json | null
          role: string
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          last_login_at?: string | null
          name?: string
          permissions?: Json | null
          role?: string
        }
        Relationships: []
      }
      attribute_definitions: {
        Row: {
          allowed_values: Json | null
          created_at: string | null
          filterable: boolean | null
          id: string
          name: string
          seo_visible: boolean | null
          slug: string
          sort_order: number | null
          type: string
          unit: string | null
        }
        Insert: {
          allowed_values?: Json | null
          created_at?: string | null
          filterable?: boolean | null
          id?: string
          name: string
          seo_visible?: boolean | null
          slug: string
          sort_order?: number | null
          type: string
          unit?: string | null
        }
        Update: {
          allowed_values?: Json | null
          created_at?: string | null
          filterable?: boolean | null
          id?: string
          name?: string
          seo_visible?: boolean | null
          slug?: string
          sort_order?: number | null
          type?: string
          unit?: string | null
        }
        Relationships: []
      }
      attribute_group_members: {
        Row: {
          attribute_id: string
          group_id: string
          sort_order: number | null
        }
        Insert: {
          attribute_id: string
          group_id: string
          sort_order?: number | null
        }
        Update: {
          attribute_id?: string
          group_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "attribute_group_members_attribute_id_fkey"
            columns: ["attribute_id"]
            isOneToOne: false
            referencedRelation: "attribute_definitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attribute_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "attribute_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      attribute_groups: {
        Row: {
          id: string
          name: string
          sort_order: number | null
        }
        Insert: {
          id?: string
          name: string
          sort_order?: number | null
        }
        Update: {
          id?: string
          name?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          admin_user_id: string | null
          changes: Json | null
          created_at: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: string | null
        }
        Insert: {
          action: string
          admin_user_id?: string | null
          changes?: Json | null
          created_at?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: string | null
        }
        Update: {
          action?: string
          admin_user_id?: string | null
          changes?: Json | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      banners: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          link_url: string | null
          locale: string | null
          placement: string
          sort_order: number | null
          starts_at: string | null
          subtitle: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          link_url?: string | null
          locale?: string | null
          placement: string
          sort_order?: number | null
          starts_at?: string | null
          subtitle?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          link_url?: string | null
          locale?: string | null
          placement?: string
          sort_order?: number | null
          starts_at?: string | null
          subtitle?: string | null
          title?: string | null
        }
        Relationships: []
      }
      brands: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          logo_url: string | null
          name: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          cart_id: string
          created_at: string | null
          id: string
          quantity: number
          unit_price: number
          variant_id: string
        }
        Insert: {
          cart_id: string
          created_at?: string | null
          id?: string
          quantity?: number
          unit_price: number
          variant_id: string
        }
        Update: {
          cart_id?: string
          created_at?: string | null
          id?: string
          quantity?: number
          unit_price?: number
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          coupon_code: string | null
          created_at: string | null
          currency: string | null
          customer_id: string | null
          id: string
          locale: string | null
          notes: string | null
          session_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          coupon_code?: string | null
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          id?: string
          locale?: string | null
          notes?: string | null
          session_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          coupon_code?: string | null
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          id?: string
          locale?: string | null
          notes?: string | null
          session_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "carts_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string | null
          depth: number
          google_category_id: string | null
          id: string
          image_url: string | null
          intro_content: string | null
          name: string
          parent_id: string | null
          path: string
          product_count: number | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          depth?: number
          google_category_id?: string | null
          id?: string
          image_url?: string | null
          intro_content?: string | null
          name: string
          parent_id?: string | null
          path: string
          product_count?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          depth?: number
          google_category_id?: string | null
          id?: string
          image_url?: string | null
          intro_content?: string | null
          name?: string
          parent_id?: string | null
          path?: string
          product_count?: number | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_pages: {
        Row: {
          content: Json | null
          created_at: string | null
          created_by: string | null
          id: string
          locale: string | null
          meta_description: string | null
          meta_title: string | null
          noindex: boolean | null
          page_type: string | null
          publish_at: string | null
          slug: string
          status: string | null
          template: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: Json | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          locale?: string | null
          meta_description?: string | null
          meta_title?: string | null
          noindex?: boolean | null
          page_type?: string | null
          publish_at?: string | null
          slug: string
          status?: string | null
          template?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: Json | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          locale?: string | null
          meta_description?: string | null
          meta_title?: string | null
          noindex?: boolean | null
          page_type?: string | null
          publish_at?: string | null
          slug?: string
          status?: string | null
          template?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      collections: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          locale: string | null
          meta_description: string | null
          meta_title: string | null
          name: string
          product_ids: string[] | null
          rules: Json | null
          slug: string
          status: string | null
          type: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          locale?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          product_ids?: string[] | null
          rules?: Json | null
          slug: string
          status?: string | null
          type?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          locale?: string | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          product_ids?: string[] | null
          rules?: Json | null
          slug?: string
          status?: string | null
          type?: string | null
        }
        Relationships: []
      }
      coupons: {
        Row: {
          applicable_categories: string[] | null
          applicable_products: string[] | null
          code: string
          created_at: string | null
          expires_at: string | null
          id: string
          max_discount: number | null
          min_order_amount: number | null
          per_customer_limit: number | null
          starts_at: string | null
          status: string | null
          type: string
          usage_limit: number | null
          used_count: number | null
          value: number
        }
        Insert: {
          applicable_categories?: string[] | null
          applicable_products?: string[] | null
          code: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          max_discount?: number | null
          min_order_amount?: number | null
          per_customer_limit?: number | null
          starts_at?: string | null
          status?: string | null
          type: string
          usage_limit?: number | null
          used_count?: number | null
          value: number
        }
        Update: {
          applicable_categories?: string[] | null
          applicable_products?: string[] | null
          code?: string
          created_at?: string | null
          expires_at?: string | null
          id?: string
          max_discount?: number | null
          min_order_amount?: number | null
          per_customer_limit?: number | null
          starts_at?: string | null
          status?: string | null
          type?: string
          usage_limit?: number | null
          used_count?: number | null
          value?: number
        }
        Relationships: []
      }
      customers: {
        Row: {
          auth_user_id: string | null
          company_name: string | null
          created_at: string | null
          customer_group: string | null
          customer_type: string | null
          email: string | null
          first_name: string | null
          gst_number: string | null
          id: string
          last_name: string | null
          notes: string | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          auth_user_id?: string | null
          company_name?: string | null
          created_at?: string | null
          customer_group?: string | null
          customer_type?: string | null
          email?: string | null
          first_name?: string | null
          gst_number?: string | null
          id?: string
          last_name?: string | null
          notes?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_user_id?: string | null
          company_name?: string | null
          created_at?: string | null
          customer_group?: string | null
          customer_type?: string | null
          email?: string | null
          first_name?: string | null
          gst_number?: string | null
          id?: string
          last_name?: string | null
          notes?: string | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      import_batches: {
        Row: {
          auto_published: number | null
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          error_rows: number | null
          error_summary: Json | null
          file_checksum: string | null
          file_name: string | null
          file_url: string | null
          id: string
          processed_rows: number | null
          rejected: number | null
          schema_template: string | null
          sent_to_review: number | null
          skipped_rows: number | null
          source: string
          started_at: string | null
          status: string | null
          success_rows: number | null
          total_rows: number | null
          updated_at: string | null
        }
        Insert: {
          auto_published?: number | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          error_rows?: number | null
          error_summary?: Json | null
          file_checksum?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          processed_rows?: number | null
          rejected?: number | null
          schema_template?: string | null
          sent_to_review?: number | null
          skipped_rows?: number | null
          source: string
          started_at?: string | null
          status?: string | null
          success_rows?: number | null
          total_rows?: number | null
          updated_at?: string | null
        }
        Update: {
          auto_published?: number | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          error_rows?: number | null
          error_summary?: Json | null
          file_checksum?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          processed_rows?: number | null
          rejected?: number | null
          schema_template?: string | null
          sent_to_review?: number | null
          skipped_rows?: number | null
          source?: string
          started_at?: string | null
          status?: string | null
          success_rows?: number | null
          total_rows?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      import_rows: {
        Row: {
          batch_id: string
          commercial_score: number | null
          created_at: string | null
          duplicate_of: string | null
          errors: Json | null
          id: string
          normalized_data: Json | null
          publish_decision: string | null
          raw_data: Json
          resolved_product_id: string | null
          resolved_variant_id: string | null
          row_number: number
          status: string | null
        }
        Insert: {
          batch_id: string
          commercial_score?: number | null
          created_at?: string | null
          duplicate_of?: string | null
          errors?: Json | null
          id?: string
          normalized_data?: Json | null
          publish_decision?: string | null
          raw_data: Json
          resolved_product_id?: string | null
          resolved_variant_id?: string | null
          row_number: number
          status?: string | null
        }
        Update: {
          batch_id?: string
          commercial_score?: number | null
          created_at?: string | null
          duplicate_of?: string | null
          errors?: Json | null
          id?: string
          normalized_data?: Json | null
          publish_decision?: string | null
          raw_data?: Json
          resolved_product_id?: string | null
          resolved_variant_id?: string | null
          row_number?: number
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "import_rows_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "import_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_rows_duplicate_of_fkey"
            columns: ["duplicate_of"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_rows_resolved_product_id_fkey"
            columns: ["resolved_product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_rows_resolved_variant_id_fkey"
            columns: ["resolved_variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      indexation_rules: {
        Row: {
          canonical_target: string | null
          created_at: string | null
          id: string
          pattern: string
          reason: string | null
          rule_type: string
        }
        Insert: {
          canonical_target?: string | null
          created_at?: string | null
          id?: string
          pattern: string
          reason?: string | null
          rule_type: string
        }
        Update: {
          canonical_target?: string | null
          created_at?: string | null
          id?: string
          pattern?: string
          reason?: string | null
          rule_type?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          created_at: string | null
          gst_number: string | null
          id: string
          invoice_number: string
          order_id: string
          pdf_url: string | null
          subtotal: number | null
          tax_amount: number | null
          total: number | null
        }
        Insert: {
          created_at?: string | null
          gst_number?: string | null
          id?: string
          invoice_number: string
          order_id: string
          pdf_url?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          total?: number | null
        }
        Update: {
          created_at?: string | null
          gst_number?: string | null
          id?: string
          invoice_number?: string
          order_id?: string
          pdf_url?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          total?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      job_runs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          job_type: string
          max_retries: number | null
          next_retry_at: string | null
          progress: Json | null
          reference_id: string | null
          retry_count: number | null
          started_at: string | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          job_type: string
          max_retries?: number | null
          next_retry_at?: string | null
          progress?: Json | null
          reference_id?: string | null
          retry_count?: number | null
          started_at?: string | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          job_type?: string
          max_retries?: number | null
          next_retry_at?: string | null
          progress?: Json | null
          reference_id?: string | null
          retry_count?: number | null
          started_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      keepa_snapshots: {
        Row: {
          amazon_is_seller: boolean | null
          asin: string
          availability_trend: string | null
          brand: string | null
          buy_box_price: number | null
          category_tree: string | null
          created_at: string | null
          fetched_at: string | null
          id: string
          marketplace: string | null
          offer_count: number | null
          price_history: Json | null
          product_id: string | null
          rating: number | null
          review_count: number | null
          sales_rank: number | null
          sales_rank_history: Json | null
          title: string | null
          variation_data: Json | null
        }
        Insert: {
          amazon_is_seller?: boolean | null
          asin: string
          availability_trend?: string | null
          brand?: string | null
          buy_box_price?: number | null
          category_tree?: string | null
          created_at?: string | null
          fetched_at?: string | null
          id?: string
          marketplace?: string | null
          offer_count?: number | null
          price_history?: Json | null
          product_id?: string | null
          rating?: number | null
          review_count?: number | null
          sales_rank?: number | null
          sales_rank_history?: Json | null
          title?: string | null
          variation_data?: Json | null
        }
        Update: {
          amazon_is_seller?: boolean | null
          asin?: string
          availability_trend?: string | null
          brand?: string | null
          buy_box_price?: number | null
          category_tree?: string | null
          created_at?: string | null
          fetched_at?: string | null
          id?: string
          marketplace?: string | null
          offer_count?: number | null
          price_history?: Json | null
          product_id?: string | null
          rating?: number | null
          review_count?: number | null
          sales_rank?: number | null
          sales_rank_history?: Json | null
          title?: string | null
          variation_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "keepa_snapshots_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      market_offers: {
        Row: {
          availability: string | null
          cod_eligible: boolean | null
          compare_at_price: number | null
          currency: string
          duties_included: boolean | null
          eta_days_max: number | null
          eta_days_min: number | null
          id: string
          market: string
          price: number
          return_window_days: number | null
          shipping_class: string | null
          tax_included: boolean | null
          variant_id: string
        }
        Insert: {
          availability?: string | null
          cod_eligible?: boolean | null
          compare_at_price?: number | null
          currency: string
          duties_included?: boolean | null
          eta_days_max?: number | null
          eta_days_min?: number | null
          id?: string
          market: string
          price: number
          return_window_days?: number | null
          shipping_class?: string | null
          tax_included?: boolean | null
          variant_id: string
        }
        Update: {
          availability?: string | null
          cod_eligible?: boolean | null
          compare_at_price?: number | null
          currency?: string
          duties_included?: boolean | null
          eta_days_max?: number | null
          eta_days_min?: number | null
          id?: string
          market?: string
          price?: number
          return_window_days?: number | null
          shipping_class?: string | null
          tax_included?: boolean | null
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "market_offers_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      merchant_products: {
        Row: {
          created_at: string | null
          destinations: Json | null
          id: string
          issue_count: number | null
          issues: Json | null
          last_payload: Json | null
          last_pushed_at: string | null
          market: string
          merchant_offer_id: string | null
          next_retry_at: string | null
          retry_count: number | null
          status: string | null
          updated_at: string | null
          variant_id: string
        }
        Insert: {
          created_at?: string | null
          destinations?: Json | null
          id?: string
          issue_count?: number | null
          issues?: Json | null
          last_payload?: Json | null
          last_pushed_at?: string | null
          market?: string
          merchant_offer_id?: string | null
          next_retry_at?: string | null
          retry_count?: number | null
          status?: string | null
          updated_at?: string | null
          variant_id: string
        }
        Update: {
          created_at?: string | null
          destinations?: Json | null
          id?: string
          issue_count?: number | null
          issues?: Json | null
          last_payload?: Json | null
          last_pushed_at?: string | null
          market?: string
          merchant_offer_id?: string | null
          next_retry_at?: string | null
          retry_count?: number | null
          status?: string | null
          updated_at?: string | null
          variant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "merchant_products_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      merchant_sync_jobs: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_items: number | null
          error_summary: Json | null
          id: string
          job_type: string
          market: string
          processed_items: number | null
          started_at: string | null
          status: string | null
          success_items: number | null
          total_items: number | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_items?: number | null
          error_summary?: Json | null
          id?: string
          job_type: string
          market: string
          processed_items?: number | null
          started_at?: string | null
          status?: string | null
          success_items?: number | null
          total_items?: number | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_items?: number | null
          error_summary?: Json | null
          id?: string
          job_type?: string
          market?: string
          processed_items?: number | null
          started_at?: string | null
          status?: string | null
          success_items?: number | null
          total_items?: number | null
        }
        Relationships: []
      }
      navigation_items: {
        Row: {
          id: string
          is_active: boolean | null
          label: string
          locale: string | null
          menu_location: string
          parent_id: string | null
          sort_order: number | null
          url: string | null
        }
        Insert: {
          id?: string
          is_active?: boolean | null
          label: string
          locale?: string | null
          menu_location: string
          parent_id?: string | null
          sort_order?: number | null
          url?: string | null
        }
        Update: {
          id?: string
          is_active?: boolean | null
          label?: string
          locale?: string | null
          menu_location?: string
          parent_id?: string | null
          sort_order?: number | null
          url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "navigation_items_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "navigation_items"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          admin_user_id: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          link: string | null
          message: string | null
          title: string
          type: string
        }
        Insert: {
          admin_user_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string | null
          title: string
          type: string
        }
        Update: {
          admin_user_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          link?: string | null
          message?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_admin_user_id_fkey"
            columns: ["admin_user_id"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          discount_amount: number | null
          id: string
          order_id: string
          product_title: string
          quantity: number
          sku: string
          tax_amount: number | null
          tax_rate: number | null
          total_price: number
          unit_price: number
          variant_id: string
          variant_title: string | null
        }
        Insert: {
          discount_amount?: number | null
          id?: string
          order_id: string
          product_title: string
          quantity: number
          sku: string
          tax_amount?: number | null
          tax_rate?: number | null
          total_price: number
          unit_price: number
          variant_id: string
          variant_title?: string | null
        }
        Update: {
          discount_amount?: number | null
          id?: string
          order_id?: string
          product_title?: string
          quantity?: number
          sku?: string
          tax_amount?: number | null
          tax_rate?: number | null
          total_price?: number
          unit_price?: number
          variant_id?: string
          variant_title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          admin_notes: string | null
          billing_address: Json
          coupon_code: string | null
          created_at: string | null
          currency: string | null
          customer_id: string | null
          customer_notes: string | null
          discount_amount: number | null
          estimated_delivery: string | null
          gst_invoice_number: string | null
          id: string
          is_b2b: boolean | null
          locale: string | null
          order_number: string
          payment_method: string | null
          payment_reference: string | null
          payment_status: string | null
          shipping_address: Json
          shipping_amount: number | null
          shipping_method: string | null
          status: string | null
          subtotal: number
          tax_amount: number | null
          total: number
          tracking_number: string | null
          tracking_url: string | null
          updated_at: string | null
        }
        Insert: {
          admin_notes?: string | null
          billing_address: Json
          coupon_code?: string | null
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          customer_notes?: string | null
          discount_amount?: number | null
          estimated_delivery?: string | null
          gst_invoice_number?: string | null
          id?: string
          is_b2b?: boolean | null
          locale?: string | null
          order_number: string
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          shipping_address: Json
          shipping_amount?: number | null
          shipping_method?: string | null
          status?: string | null
          subtotal: number
          tax_amount?: number | null
          total: number
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_notes?: string | null
          billing_address?: Json
          coupon_code?: string | null
          created_at?: string | null
          currency?: string | null
          customer_id?: string | null
          customer_notes?: string | null
          discount_amount?: number | null
          estimated_delivery?: string | null
          gst_invoice_number?: string | null
          id?: string
          is_b2b?: boolean | null
          locale?: string | null
          order_number?: string
          payment_method?: string | null
          payment_reference?: string | null
          payment_status?: string | null
          shipping_address?: Json
          shipping_amount?: number | null
          shipping_method?: string | null
          status?: string | null
          subtotal?: number
          tax_amount?: number | null
          total?: number
          tracking_number?: string | null
          tracking_url?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      product_attribute_values: {
        Row: {
          attribute_id: string | null
          id: string
          product_id: string | null
          value_boolean: boolean | null
          value_json: Json | null
          value_number: number | null
          value_text: string | null
          variant_id: string | null
        }
        Insert: {
          attribute_id?: string | null
          id?: string
          product_id?: string | null
          value_boolean?: boolean | null
          value_json?: Json | null
          value_number?: number | null
          value_text?: string | null
          variant_id?: string | null
        }
        Update: {
          attribute_id?: string | null
          id?: string
          product_id?: string | null
          value_boolean?: boolean | null
          value_json?: Json | null
          value_number?: number | null
          value_text?: string | null
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_attribute_values_attribute_id_fkey"
            columns: ["attribute_id"]
            isOneToOne: false
            referencedRelation: "attribute_definitions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_attribute_values_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_attribute_values_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      product_categories: {
        Row: {
          category_id: string
          is_primary: boolean | null
          product_id: string
          sort_order: number | null
        }
        Insert: {
          category_id: string
          is_primary?: boolean | null
          product_id: string
          sort_order?: number | null
        }
        Update: {
          category_id?: string
          is_primary?: boolean | null
          product_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_categories_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_identifiers: {
        Row: {
          confidence: number | null
          created_at: string | null
          id: string
          identifier_type: string
          identifier_value: string
          product_id: string | null
          source: string | null
          variant_id: string | null
        }
        Insert: {
          confidence?: number | null
          created_at?: string | null
          id?: string
          identifier_type: string
          identifier_value: string
          product_id?: string | null
          source?: string | null
          variant_id?: string | null
        }
        Update: {
          confidence?: number | null
          created_at?: string | null
          id?: string
          identifier_type?: string
          identifier_value?: string
          product_id?: string | null
          source?: string | null
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_identifiers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_identifiers_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      product_media: {
        Row: {
          alt_text: string | null
          checksum: string | null
          created_at: string | null
          file_size: number | null
          height: number | null
          id: string
          product_id: string
          role: string | null
          sort_order: number | null
          source_url: string | null
          type: string | null
          url: string
          variant_id: string | null
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          checksum?: string | null
          created_at?: string | null
          file_size?: number | null
          height?: number | null
          id?: string
          product_id: string
          role?: string | null
          sort_order?: number | null
          source_url?: string | null
          type?: string | null
          url: string
          variant_id?: string | null
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          checksum?: string | null
          created_at?: string | null
          file_size?: number | null
          height?: number | null
          id?: string
          product_id?: string
          role?: string | null
          sort_order?: number | null
          source_url?: string | null
          type?: string | null
          url?: string
          variant_id?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_media_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_media_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "product_variants"
            referencedColumns: ["id"]
          },
        ]
      }
      product_relationships: {
        Row: {
          id: string
          product_id: string | null
          related_product_id: string | null
          relationship_type: string
          sort_order: number | null
        }
        Insert: {
          id?: string
          product_id?: string | null
          related_product_id?: string | null
          relationship_type: string
          sort_order?: number | null
        }
        Update: {
          id?: string
          product_id?: string | null
          related_product_id?: string | null
          relationship_type?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_relationships_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_relationships_related_product_id_fkey"
            columns: ["related_product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_scores: {
        Row: {
          brand_trust_score: number | null
          competition_score: number | null
          content_completeness: number | null
          demand_score: number | null
          id: string
          image_completeness: number | null
          margin_estimate: number | null
          merchant_approvability: number | null
          price_competitiveness: number | null
          product_id: string
          scored_at: string | null
          scoring_version: number | null
          seo_value: number | null
          total_score: number
          uniqueness_score: number | null
        }
        Insert: {
          brand_trust_score?: number | null
          competition_score?: number | null
          content_completeness?: number | null
          demand_score?: number | null
          id?: string
          image_completeness?: number | null
          margin_estimate?: number | null
          merchant_approvability?: number | null
          price_competitiveness?: number | null
          product_id: string
          scored_at?: string | null
          scoring_version?: number | null
          seo_value?: number | null
          total_score: number
          uniqueness_score?: number | null
        }
        Update: {
          brand_trust_score?: number | null
          competition_score?: number | null
          content_completeness?: number | null
          demand_score?: number | null
          id?: string
          image_completeness?: number | null
          margin_estimate?: number | null
          merchant_approvability?: number | null
          price_competitiveness?: number | null
          product_id?: string
          scored_at?: string | null
          scoring_version?: number | null
          seo_value?: number | null
          total_score?: number
          uniqueness_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_scores_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_variants: {
        Row: {
          barcode: string | null
          compare_at_price: number | null
          cost_price: number | null
          created_at: string | null
          currency: string | null
          height_cm: number | null
          id: string
          inventory_quantity: number | null
          inventory_status: string | null
          lead_time_days: number | null
          length_cm: number | null
          option_values: Json | null
          price: number
          product_id: string
          shipping_class: string | null
          sku: string
          sort_order: number | null
          status: string | null
          title: string | null
          updated_at: string | null
          weight_grams: number | null
          width_cm: number | null
        }
        Insert: {
          barcode?: string | null
          compare_at_price?: number | null
          cost_price?: number | null
          created_at?: string | null
          currency?: string | null
          height_cm?: number | null
          id?: string
          inventory_quantity?: number | null
          inventory_status?: string | null
          lead_time_days?: number | null
          length_cm?: number | null
          option_values?: Json | null
          price: number
          product_id: string
          shipping_class?: string | null
          sku: string
          sort_order?: number | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          weight_grams?: number | null
          width_cm?: number | null
        }
        Update: {
          barcode?: string | null
          compare_at_price?: number | null
          cost_price?: number | null
          created_at?: string | null
          currency?: string | null
          height_cm?: number | null
          id?: string
          inventory_quantity?: number | null
          inventory_status?: string | null
          lead_time_days?: number | null
          length_cm?: number | null
          option_values?: Json | null
          price?: number
          product_id?: string
          shipping_class?: string | null
          sku?: string
          sort_order?: number | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          weight_grams?: number | null
          width_cm?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "product_variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          brand_id: string | null
          canonical_url: string | null
          catalog_score: number | null
          compatibility_info: string | null
          created_at: string | null
          description: string | null
          highlights: Json | null
          id: string
          merchant_status: string | null
          meta_description: string | null
          meta_title: string | null
          noindex: boolean | null
          primary_image_url: string | null
          product_type: string | null
          publish_status: string | null
          search_score: number | null
          short_description: string | null
          slug: string
          status: string | null
          structured_data_status: string | null
          title: string
          updated_at: string | null
          warranty_info: string | null
          whats_in_box: string | null
        }
        Insert: {
          brand_id?: string | null
          canonical_url?: string | null
          catalog_score?: number | null
          compatibility_info?: string | null
          created_at?: string | null
          description?: string | null
          highlights?: Json | null
          id?: string
          merchant_status?: string | null
          meta_description?: string | null
          meta_title?: string | null
          noindex?: boolean | null
          primary_image_url?: string | null
          product_type?: string | null
          publish_status?: string | null
          search_score?: number | null
          short_description?: string | null
          slug: string
          status?: string | null
          structured_data_status?: string | null
          title: string
          updated_at?: string | null
          warranty_info?: string | null
          whats_in_box?: string | null
        }
        Update: {
          brand_id?: string | null
          canonical_url?: string | null
          catalog_score?: number | null
          compatibility_info?: string | null
          created_at?: string | null
          description?: string | null
          highlights?: Json | null
          id?: string
          merchant_status?: string | null
          meta_description?: string | null
          meta_title?: string | null
          noindex?: boolean | null
          primary_image_url?: string | null
          product_type?: string | null
          publish_status?: string | null
          search_score?: number | null
          short_description?: string | null
          slug?: string
          status?: string | null
          structured_data_status?: string | null
          title?: string
          updated_at?: string | null
          warranty_info?: string | null
          whats_in_box?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
        ]
      }
      publish_decisions: {
        Row: {
          decided_at: string | null
          decided_by: string | null
          decision: string
          id: string
          import_row_id: string | null
          product_id: string
          reason: string | null
          rules_applied: Json | null
          score_at_decision: number | null
        }
        Insert: {
          decided_at?: string | null
          decided_by?: string | null
          decision: string
          id?: string
          import_row_id?: string | null
          product_id: string
          reason?: string | null
          rules_applied?: Json | null
          score_at_decision?: number | null
        }
        Update: {
          decided_at?: string | null
          decided_by?: string | null
          decision?: string
          id?: string
          import_row_id?: string | null
          product_id?: string
          reason?: string | null
          rules_applied?: Json | null
          score_at_decision?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "publish_decisions_import_row_id_fkey"
            columns: ["import_row_id"]
            isOneToOne: false
            referencedRelation: "import_rows"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "publish_decisions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      redirects: {
        Row: {
          created_at: string | null
          from_path: string
          hits: number | null
          id: string
          is_active: boolean | null
          last_hit_at: string | null
          status_code: number | null
          to_path: string
        }
        Insert: {
          created_at?: string | null
          from_path: string
          hits?: number | null
          id?: string
          is_active?: boolean | null
          last_hit_at?: string | null
          status_code?: number | null
          to_path: string
        }
        Update: {
          created_at?: string | null
          from_path?: string
          hits?: number | null
          id?: string
          is_active?: boolean | null
          last_hit_at?: string | null
          status_code?: number | null
          to_path?: string
        }
        Relationships: []
      }
      return_items: {
        Row: {
          condition_on_return: string | null
          id: string
          order_item_id: string
          quantity: number
          return_id: string
        }
        Insert: {
          condition_on_return?: string | null
          id?: string
          order_item_id: string
          quantity: number
          return_id: string
        }
        Update: {
          condition_on_return?: string | null
          id?: string
          order_item_id?: string
          quantity?: number
          return_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "return_items_order_item_id_fkey"
            columns: ["order_item_id"]
            isOneToOne: false
            referencedRelation: "order_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "return_items_return_id_fkey"
            columns: ["return_id"]
            isOneToOne: false
            referencedRelation: "returns"
            referencedColumns: ["id"]
          },
        ]
      }
      returns: {
        Row: {
          created_at: string | null
          id: string
          order_id: string
          reason_code: string | null
          reason_details: string | null
          refund_amount: number | null
          refund_method: string | null
          refund_reference: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          order_id: string
          reason_code?: string | null
          reason_details?: string | null
          refund_amount?: number | null
          refund_method?: string | null
          refund_reference?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          order_id?: string
          reason_code?: string | null
          reason_details?: string | null
          refund_amount?: number | null
          refund_method?: string | null
          refund_reference?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "returns_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      sitemap_entries: {
        Row: {
          change_freq: string | null
          id: string
          is_active: boolean | null
          last_modified: string | null
          locale: string | null
          priority: number | null
          sitemap_type: string
          url: string
        }
        Insert: {
          change_freq?: string | null
          id?: string
          is_active?: boolean | null
          last_modified?: string | null
          locale?: string | null
          priority?: number | null
          sitemap_type: string
          url: string
        }
        Update: {
          change_freq?: string | null
          id?: string
          is_active?: boolean | null
          last_modified?: string | null
          locale?: string | null
          priority?: number | null
          sitemap_type?: string
          url?: string
        }
        Relationships: []
      }
      source_mappings: {
        Row: {
          column_mapping: Json
          created_at: string | null
          id: string
          last_used_at: string | null
          normalization_rules: Json | null
          source_name: string
        }
        Insert: {
          column_mapping: Json
          created_at?: string | null
          id?: string
          last_used_at?: string | null
          normalization_rules?: Json | null
          source_name: string
        }
        Update: {
          column_mapping?: Json
          created_at?: string | null
          id?: string
          last_used_at?: string | null
          normalization_rules?: Json | null
          source_name?: string
        }
        Relationships: []
      }
      webhooks: {
        Row: {
          created_at: string | null
          event: string
          failure_count: number | null
          id: string
          is_active: boolean | null
          last_triggered_at: string | null
          secret: string | null
          target_url: string
        }
        Insert: {
          created_at?: string | null
          event: string
          failure_count?: number | null
          id?: string
          is_active?: boolean | null
          last_triggered_at?: string | null
          secret?: string | null
          target_url: string
        }
        Update: {
          created_at?: string | null
          event?: string
          failure_count?: number | null
          id?: string
          is_active?: boolean | null
          last_triggered_at?: string | null
          secret?: string | null
          target_url?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

